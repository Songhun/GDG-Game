/**
 * game Module
 *
 * Description
 */
angular.module('IMEG-Game', ['ui.keypress']).
	controller('main',function($scope) {
		var ws = null;

		$scope.serverStatus = "연결 안됨";

		$scope.question = "게임을 시작하여 주세요";
		$scope.answer = "";
		$scope.result = "";

		$scope.start = function () {
			_initServer();

			if(ws !== null){
			}else{
				throw new Error("웹서버에 연결 안됨");
			}
		}

		$scope.submit = function (answer) {
			if(ws.readyState === 1){
				ws.send(answer)
			}else {
				throw new Error("서버연결 안됨");
			}
		}

		$scope.isStarted = function() {
			return ($scope.serverStatus === "연결 되었음") ? true : false;
		};

		function _initServer () {
			ws = new WebSocket("ws://ec2-23-21-176-91.compute-1.amazonaws.com:8089");
			
			ws.onopen = function() {
				$scope.serverStatus = "연결 되었음";
				ws.send("@@start");
				$scope.$apply();
			};

			ws.onmessage = function(e) {
				var received_msg = JSON.parse(e.data).data;
				var received_type = JSON.parse(e.data).type;

				if(received_type === "result"){
					$scope.result = received_msg;
					$scope.question = "";
					$scope.answer = "";
					ws.send("@@start");
				}else{
					$scope.question = received_msg;
				}
				$scope.debug = e.data;
				$scope.$apply();
			};
		}
	});