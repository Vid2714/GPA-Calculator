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
    document.getElementById('result').textContent = `Your GPA is: ${gpa.toFixed(2)}`;
  }