/**
 * Created by Phil on 15/05/2016.
 */


mayaNotes.service('dataAccess',
    
        function ($rootScope) {
            var temp = [
                {
                    id: 1,
                    date: '15-05-2016',
                    name: 'Fare la spesa',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris faucibus pulvinar eleifend. Vivamus commodo molestie lectus, vel posuere quam. Proin consectetur, eros ac suscipit facilisis, nulla dui euismod nulla, quis fringilla nunc ante quis sapien. Ut commodo ut sem ac pharetra. Vivamus at eros convallis, posuere diam blandit, pulvinar est. Proin commodo lacinia ipsum, quis dictum mi tincidunt et. Cras a tellus nunc.'
                }
            ];

            var l = localStorage.getItem('people');
            if(l)
                temp = JSON.parse(l);

            var result = new Object();

            result.getAll = function(){
                return temp;
            };

            result.getById = function(id){
                for(var i= 0; i < temp.length; i++){
                    var x = temp[i];
                    if(x.id == id)
                        return x;
                }

                return null;
            };

            result.update = function(obj){
                if(obj != null) {
                    for (var i = 0; i < temp.length; i++) {
                        var x = temp[i];
                        if (x.id == obj.id) {
                            temp[i] = obj;
                            localStorage.setItem('people', angular.toJson(temp));
                            return;
                        }
                    }
                }
            };

            result.insert = function(obj){
                if(obj != null) {
                    if(temp.length == 0)
                        obj.id = 1;
                    else
                        obj.id =  temp[temp.length - 1].id + 1;
                    temp.push(obj);
                    localStorage.setItem('people', angular.toJson(temp));
                }
            };

            result.delete = function(id){
                for(var i= 0; i < temp.length; i++){
                    var x = temp[i];
                    if(x.id == id){
                        temp.splice(i, 1);
                        localStorage.setItem('people', angular.toJson(temp));
                        return;
                    }
                }
            };

            return result;
        });
