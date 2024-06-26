const gradeValues = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'C': 5,
  'D': 4,
  'F': 0
};

let semesterCount = 0;

function generateInputs() {
  const numCourses = document.getElementById('num-courses').value;
  const courseInputs = document.getElementById('course-inputs');
  courseInputs.innerHTML = '';

  for (let i = 1; i <= numCourses; i++) {
    const div = document.createElement('div');
    div.innerHTML = `
      <label for="course-${i}">Course ${i}:</label>
      <input type="number" id="course-${i}-credits" min="0" max="5" required>
      <select id="course-${i}-grade" required>
        <option value="O">O</option>
        <option value="A+">A+</option>
        <option value="A">A</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="F">F</option>
      </select>
    `;
    courseInputs.appendChild(div);
  }

  document.getElementById('calculate-gpa').disabled = false;
}

function calculateGPA() {
  const numCourses = document.getElementById('num-courses').value;
  let totalCredits = 0;
  let totalGradePoints = 0;

  for (let i = 1; i <= numCourses; i++) {
    const credits = parseInt(document.getElementById(`course-${i}-credits`).value);
    const grade = document.getElementById(`course-${i}-grade`).value;
    const gradePoint = gradeValues[grade];

    totalCredits += credits;
    totalGradePoints += credits * gradePoint;
  }

  const gpa = totalGradePoints / totalCredits;
  document.getElementById('gpa-result').textContent = `Your GPA is: ${gpa.toFixed(2)}`;

  // Trigger confetti
  throwConfetti();

  playChampions();
}

function addSemester() {
  semesterCount++;
  const semesterDiv = document.createElement('div');
  semesterDiv.className = 'semester';
  semesterDiv.innerHTML = `
    <h3>Semester ${semesterCount}</h3>
    <label>Credits:</label>
    <input type="number" id="credits${semesterCount}" placeholder="Credits" min="0" step="0.5" required>
    <label>GPA:</label>
    <input type="number" id="gpa${semesterCount}" placeholder="GPA" min="0" max="10" step="0.01" required>
  `;
  document.getElementById('semesters').appendChild(semesterDiv);
}

function calculateCGPA() {
  let totalCredits = 0;
  let totalGradePoints = 0;

  for (let i = 1; i <= semesterCount; i++) {
    const credits = parseFloat(document.getElementById(`credits${i}`).value) || 0;
    const gpa = parseFloat(document.getElementById(`gpa${i}`).value) || 0;

    totalCredits += credits;
    totalGradePoints += credits * gpa;
  }

  const cgpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
  document.getElementById('cgpa-result').textContent = `Your CGPA is: ${cgpa.toFixed(2)}`;

  // Trigger confetti
  throwConfetti();

  playChampions();
}

function throwConfetti() {
  const end = Date.now() + (3 * 1000); // 3 seconds from now

  const colors = ['#ff0000', '#00ff00', '#0000ff']; // Red, Green, Blue

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}

function playChampions() {
  const audio = document.getElementById('championsAudio');
  audio.play();
}

// Add initial semester
addSemester();