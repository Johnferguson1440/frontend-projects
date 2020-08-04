//create event on click
$('#submit').on('click', function(){
    //clear current spans in result div
    $('#results').find('span').remove();
    //create variable for input text value
    var search = $('input:text').val().toUpperCase();
    //make ajax call to api to get results
    $.ajax({
        type: 'GET',
        url: "http://cors-anywhere.herokuapp.com/http://www.metaweather.com/api/location/search/?query=" + search,
        success: function(data){
            //parse through results to make array
            //data already parsed as object
            //create var for woeid
            //iterate through array
            
            //if/else for data.length if more than 1
            if(data.length>1){                    
                //append new data to create result page
                $('#results').append(`<span class="did"><h2>Did you mean</h2></span>`)
                            for(var i=0; i<data.length; i++){
                                var city =data[i];
                    $('#results').append(`<span><div id= '${city.woeid}' class="location">${city.title}</div></span>`);
                            }
                }else{
                    var city = data[0].woeid;
                    final(city);
            }
          }
    })                            
})

$(document).on('click', '.location', function(){
    var self= $(this).attr('id');
    final(self)    
})
        
function final(a){
    $.ajax({
            type: 'GET',
            url: "http://cors-anywhere.herokuapp.com/http://www.metaweather.com/api/location/"+a,
            success: function(data){
                $('#results').find('span').remove();
                //create var fordata.consolidated_weather
                var fiveDay = data.consolidated_weather;                
                //iterate through
                $('#results').append(`<span class="location"><h2>${data.title} </h2></span>`);
                for(var j =0;j<fiveDay.length;j++){
                    //create var for max temp
                    var high = Math.round(fiveDay[j].max_temp);
                    //create var for min temp
                    var low = Math.round(fiveDay[j].min_temp);
                    var day = new Date(fiveDay[j].applicable_date);
                    //sppend each[i] to a span
                     $('.location').append(`<span id="contents"><h3>${day.toDateString()} </h3>
                        <div class="cloud"><img src="http://www.metaweather.com/static/img/weather/${fiveDay[j].weather_state_abbr}.svg"/></div>
                        <div class="weather_state">${fiveDay[j].weather_state_name}</div>
                        <div class="high">High of ${faren(high)}\u00B0 F</div>
                        <div class= "low">Low of ${faren(low)}\u00B0 F</div></span>`);
                }                
            }
        })}
//func to convert celsius to farenheit
function faren(x){
 var convert = Math.round((x *1.8)+32);
 return convert; 
}



    

