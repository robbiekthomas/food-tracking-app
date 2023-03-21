<body>
  <div class='page-container'>
    <div class='sidebar'>
    </div>
    <div class='nutrition-targets'>
      <h1>Nutrition Targets</hi>
      <div class='nutrition-cards-top'>
        <div class='card'>Calories</div>
        <div class='card'>Protein</div>
        <div class='card'>Fat</div>
        <div class='card'>Carbs</div>
      </div>
      <div class='dashboard-middle'>
        <div class='middle-charts'>
          <div class='pie-chart'>Target</div>
          <div class='pie-chart'>Actual</div>
        </div>
        <div class='habit-goals'>
          <div class='goal'>
          </div>
          <div class='goal'>Fat</div>
          <div class='goal'>Carbs</div>
        </div>
      </div>
    </div>
    
    
  </div>

  
</body>

body {
  background-color: #ecedf0;
}

.page-container{
  display: flex;
}

.sidebar {
  background-color: red;
  width: 25vw;
  height: 100vh;
}

.nutrition-targets{
  background-color: green;
  width: 75vw;
}

.nutrition-cards-top {
  display: flex;
  background-color: #ffffff;
  width: 100%;
  height: 150px;
}

.card {
  margin: auto;
  height: 100px;
  width: 200px;
  background-color: pink;
}

.dashboard-middle {
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  width: 100%;
}

.middle-charts {
  background-color: pink;
  width: 60%;
  margin-left: 30px;
  display: flex;
  justify-content: space-around;
}

.pie-chart {
  background-color: blue;
    width: 200px;
    max-height: 200px;
  margin: 0.5em;
  
}
.habit-goals {
  background-color: pink;
  width: 30%;
  height: 300px;
  margin-right: 30px;
  display: flex-column;
}

.goal {
  background-color: blue;
  margin: 10px;
  height: 75px;
}

.dashboard-bottom {
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  width: 100%;
}