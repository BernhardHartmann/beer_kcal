<script>
function(var BeerCalories)
//var numbers = [175, 50, 25];

document.getElementById("SumCalories").innerHTML = BeerCalories.Add(myFunc);

function myFunc(total, num) {
  return total + num;
}
</script>