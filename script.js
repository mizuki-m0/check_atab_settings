$(function () {
    $('#check_settings').on('click', function() {
        var check_items = new Object();
        $('input[type="number"]').each(function(){
            if (this.value != ""){
                check_items[this.id] = this.value;
            }
        });

        var result = checkSettings(check_items);
        
        $("#s1").text(result[0]);
        $("#s2").text(result[1]);
        $("#s5").text(result[2]);
        $("#s6").text(result[3]);
    });

    $('#clear_btn').on('click', function() {
        if(!confirm('本当にクリアしますか？')){
            return false;
        }else{
            $('input[type="number"]').each(function(){
                this.value = "";
            });
        }
    });

});

function fluc(name, val){
    if (val == 0){
        document.getElementById(name).value = 0;
    } else {
        var now = Number(document.getElementById(name).value);
        if (now + val > 0){
            document.getElementById(name).value =  now + val;
        } else {
            document.getElementById(name).value = 0;
        }
    }
}