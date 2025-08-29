const btnSearch = document.getElementById("search-btn")
const btnReset = document.getElementById("reset-btn")

function getRecommendation(){
    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        console.log("data", data)
    })
    .catch(error => {
        console.log("error", error)
    })
}

getRecommendation()

function searchRecommendation() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const searchKey = input.toLowerCase();
        var resultArr = []

        if (searchKey == "country" || searchKey == "countries") {
            const randomIndex = Math.floor(Math.random() * data.countries.length)
            resultArr = data.countries[randomIndex].cities;
        } else if (searchKey == "beach" || searchKey == "beaches") {
            resultArr = data.beaches;
        } else if (searchKey == "temple" || searchKey == "temples") {
            resultArr = data.temples;
        } else {
          resultDiv.innerHTML = 'recommendation not found.';
        }
        if(resultArr.length > 0){
            resultArr.forEach(result => {
                const resultSectionDiv = document.createElement('div');
                resultSectionDiv.setAttribute("class", "result-section");
                const resultBodyDiv = document.createElement('div');
                resultBodyDiv.setAttribute("class", "result-body");
                resultBodyDiv.innerHTML = '';
                resultSectionDiv.innerHTML += `<img src="${result.imageUrl}" alt="hjh">`;
                resultBodyDiv.innerHTML += `<h2>${result.name}</h2>`;
                resultBodyDiv.innerHTML += `<p>${result.description}</p>`;
                resultBodyDiv.innerHTML += `<button>Visit</button>`;
                resultSectionDiv.append(resultBodyDiv);
                resultDiv.appendChild(resultSectionDiv);
                
            });
        } else {
            resultDiv.innerHTML = 'recommendation not found.';
        }
        console.log("result div", resultDiv)
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
    btnSearch.addEventListener('click', searchRecommendation);

  function resetRecommendation(){
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    document.getElementById("search-input").value = "";
  }

  btnReset.addEventListener('click', resetRecommendation)

  
