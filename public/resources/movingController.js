function movingController(moveCubeObj){

	this.movingCube = moveCubeObj;
}


//movingCube를 호출하는 무빙 컨트롤러
movingController.prototype.Controller = function(operation){
	
	if(operation==="R"||operation==="L'"||operation==="M'"){
		
		this.movingCube.axialclockwise(operation);
		if(operation==="R"){
			this.movingCube.selfclockwise(operation);
		}
		if(operation==="L'"){
			this.movingCube.selfcounterclockwise(operation);

		}	
		
	}
	if(operation==="R2"||operation==="L'2"||operation==="M'2"){
		var oper = operation.charAt(0);
		if(operation.charAt(1)==="'"){
			oper = oper + operation.charAt(1);
		}
		
	
		for(var i=0;i<2;i++){
			this.movingCube.axialclockwise(oper);
			
			if(operation==="L'2"){
				this.movingCube.selfcounterclockwise(oper);
				
			}
			if(operation==="R2"){
				this.movingCube.selfclockwise(oper);
				
			}
			
		}
		
	}
	if(operation==="U"||operation==="D'"||operation==="E'"){
		this.movingCube.horizontalclockwise(operation);
		
		if(operation==="U"){
			this.movingCube.selfclockwise(operation);
		}
		if(operation==="D'"){
			this.movingCube.selfcounterclockwise(operation);
		}

	}	
	if(operation==="U2"||operation==="D'2"||operation==="E'2"){
		var oper = operation.charAt(0);
		if(operation.charAt(1)==="'"){
			oper = oper + operation.charAt(1);
		}
		for(var i=0;i<2;i++){
		this.movingCube.horizontalclockwise(oper);
		
		if(operation==="U2"){
			this.movingCube.selfclockwise(oper);
		}
		if(operation==="D'2"){
			this.movingCube.selfcounterclockwise(oper);
		}
		}

	}	
	if(operation==="F"||operation==="S"||operation==="B'"){
		this.movingCube.horizontalaxialclockwise(operation);
		if(operation==="F"){		
			this.movingCube.selfclockwise(operation);
		}
		if(operation==="B'"){
			this.movingCube.selfcounterclockwise(operation);
		}


	}	
	if(operation==="F2"||operation==="S2"||operation==="B'2"){
		var oper = operation.charAt(0);
		if(operation.charAt(1)==="'"){
			oper = oper + operation.charAt(1);
		}
		for(var i=0;i<2;i++){
		this.movingCube.horizontalaxialclockwise(oper);
		if(operation==="F2"){		
			this.movingCube.selfclockwise(oper);
		}
		if(operation==="B'2"){
			ghis.movingCube.selfcounterclockwise(oper);
		}

		}
	}	
	if(operation==="r"){
		var first = "R";
		var second = "M'"
		this.movingCube.axialclockwise(first);
		this.movingCube.selfclockwise(first);
		this.movingCube.axialclockwise(second);
	}
	if(operation==="r2"){
		for(var i=0;i<2;i++){
		var first = "R";
		var second = "M'"
		this.movingCube.axialclockwise(first);
		this.movingCube.selfclockwise(first);
		this.movingCube.axialclockwise(second);
		}
	}
	if(operation==="l"){
		var first = "L";
		var second = "M";
		this.movingCube.axialcounterclockwise(first);
		this.movingCube.selfclockwise(first);
		this.movingCube.axialcounterclockwise(second);
	}
	if(operation==="l2"){
		for(var i=0;i<2;i++){
		var first = "L";
		var second = "M";
		this.movingCube.axialcounterclockwise(first);
		this.movingCube.selfclockwise(first);
		this.movingCube.axialcounterclockwise(second);
		}
	}
	if(operation==="f"){
		var first = "F";
		var second = "S"
			this.movingCube.horizontalaxialclockwise(first);
			this.movingCube.selfclockwise(first);
			this.movingCube.horizontalaxialclockwise(second);
	}
	if(operation==="f2"){
		for(var i=0;i<2;i++){
		var first = "F";
		var second = "S"
			this.movingCube.horizontalaxialclockwise(first);
			this.movingCube.selfclockwise(first);
			this.movingCube.horizontalaxialclockwise(second);
		}
	}
	if(operation==="d"){
		var first = "D";
		var second = "E"
		this.movingCube.axialcounterclockwise(first);
		this.movingCube.selfcounterclockwise(first);
		this.movingCube.axialcounterclockwise(second);

	}
	if(operation==="d2"){
		for(var i=0;i<2;i++){
		var first = "D";
		var second = "E"
		this.movingCube.axialcounterclockwise(first);
		this.movingCube.selfcounterclockwise(first);
		this.movingCube.axialcounterclockwise(second);
		}
	}
	if(operation==="u"){
		var first = "U";
		var second = "E'"
		this.movingCube.axialclockwise(first);
		this.movingCube.selfclockwise(first);
		this.movingCube.axialclockwise(second);

	}
	if(operation==="u2"){
		for(var i=0;i<2;i++){
		var first = "U";
		var second = "E'"
		this.movingCube.axialclockwise(first);
		this.movingCube.selfclockwise(first);
		this.movingCube.axialclockwise(second);
		}
	}
	if(operation==="b"){
		var first = "B";
		var second = "S";
		this.movingCube.horizontalaxialcounterclockwise(first);
		this.movingCube.selfcounterclockwise(first);
		this.movingCube.horizontalaxialclockwise(second);

	}
	if(operation==="b2"){
		for(var i=0;i<2;i++){
		var first = "B";
		var second = "S";
		this.movingCube.horizontalaxialcounterclockwise(first);
		this.movingCube.selfcounterclockwise(first);
		this.movingCube.horizontalaxialclockwise(second);
		}
	}
	
	
	
	if(operation==="R'"||operation==="L"||operation==="M"){
		this.movingCube.axialcounterclockwise(operation);
		if(operation==="R'"){
			this.movingCube.selfcounterclockwise(operation);
		}
		if(operation==="L"){
			this.movingCube.selfclockwise(operation);


		}
	}
	if(operation==="R'2"||operation==="L2"||operation==="M2"){
		var oper = operation.charAt(0);
		if(operation.charAt(1)==="'"){
			oper = oper + operation.charAt(1);
		}
		for(var i=0;i<2;i++){
		this.movingCube.axialcounterclockwise(oper);
		if(operation==="R'2"){
			this.movingCube.selfcounterclockwise(oper);
		}
		if(operation==="L2"){
			this.movingCube.selfclockwise(oper);


		}
		}
	}
	if(operation==="U'"||operation==="D"||operation==="E"){
		this.movingCube.horizontalcounterclockwise(operation);
		if(operation==="U'"){
			this.movingCube.selfcounterclockwise(operation);
		}
		if(operation==="D"){
			this.movingCube.selfclockwise(operation);

		}

	}	
	if(operation==="U'2"||operation==="D2"||operation==="E2"){
		var oper = operation.charAt(0);
		if(operation.charAt(1)==="'"){
			oper = oper + operation.charAt(1);
		}
		for(var i=0;i<2;i++){
		this.movingCube.horizontalcounterclockwise(oper);
		if(operation==="U'2"){
			this.movingCube.selfcounterclockwise(oper);
		}
		if(operation==="D2"){
			this.movingCube.selfclockwise(oper);

		}
		}
	}	
	if(operation==="F'"||operation==="S'"||operation==="B"){
		this.movingCube.horizontalaxialcounterclockwise(operation);
		if(operation==="B"){
		this.movingCube.selfclockwise(operation);
		}
		if(operation==="F'"){
			this.movingCube.selfcounterclockwise(operation);

		}

	

	}	
	if(operation==="F'2"||operation==="S'2"||operation==="B2"){
		var oper = operation.charAt(0);
		if(operation.charAt(1)==="'"){
			oper = oper + operation.charAt(1);
		}
		for(var i=0;i<2;i++){
		this.movingCube.horizontalaxialcounterclockwise(oper);
		if(operation==="B2"){
		this.movingCube.selfclockwise(oper);
		}
		if(operation==="F'2"){
			this.movingCube.selfcounterclockwise(oper);

		}
		}
	

	}	
	if(operation==="r'"){
		var first = "R'";
		var second = "M"
		this.movingCube.axialcounterclockwise(second);
		this.movingCube.selfcounterclockwise(first);
		this.movingCube.axialcounterclockwise(first);
	}
	if(operation==="r'2"){
	for(var i=0;i<2;i++){
		var first = "R'";
		var second = "M"
		this.movingCube.axialcounterclockwise(second);
		this.movingCube.selfcounterclockwise(first);
		this.movingCube.axialcounterclockwise(first);
	}
	}
	if(operation==="l'"){
		var first = "L'";
		var second = "M'"
		this.movingCube.axialclockwise(second);
		this.movingCube.selfcounterclockwise(first);
		this.movingCube.axialclockwise(first);
	}
	if(operation==="l'2"){
	for(var i=0;i<2;i++){
		var first = "L'";
		var second = "M'"
		this.movingCube.axialclockwise(second);
		this.movingCube.selfcounterclockwise(first);
		this.movingCube.axialclockwise(first);
	}
	}
	if(operation==="f'"){
		var first = "F'";
		var second = "S'"
		this.movingCube.horizontalaxialcounterclockwise(first);
		this.movingCube.selfcounterclockwise(first);
		this.movingCube.horizontalaxialcounterclockwise(second);
	}
	if(operation==="f'2"){
		for(var i=0;i<2;i++){
		var first = "F'";
		var second = "S'"
		this.movingCube.horizontalaxialcounterclockwise(first);
		this.movingCube.selfcounterclockwise(first);
		this.movingCube.horizontalaxialcounterclockwise(second);
		}
	}
	if(operation==="d'"){
		var first = "D'";
		var second = "E'"
		this.movingCube.axialclockwise(second);
		this.movingCube.selfcounterclockwise(first);
		this.movingCube.axialcounterclockwise(first);

	}
	if(operation==="d'2"){
		for(var i=0;i<2;i++){
		var first = "D'";
		var second = "E'"
		this.movingCube.axialclockwise(second);
		this.movingCube.selfcounterclockwise(first);
		this.movingCube.axialcounterclockwise(first);
		}

	}
	if(operation==="u'"){
		var first = "U'";
		var second = "E'"
		this.movingCube.axialclockwise(second);
		this.movingCube.selfcounterclockwise(first);
		this.movingCube.axialcounterclockwise(first);

	}
	if(operation==="u'2"){
		for(var i=0;i<2;i++){
		var first = "U'";
		var second = "E'"
		this.movingCube.axialclockwise(second);
		this.movingCube.selfcounterclockwise(first);
		this.movingCube.axialcounterclockwise(first);
		}
	}
	if(operation==="b'"){
		var first = "B'";
		var second = "S'";
		this.movingCube.horizontalaxialclockwise(first);
		this.movingCube.selfclockwise(first);
		this.movingCube.horizontalcounteraxialclockwise(second);

	}
	if(operation==="b'2"){
		for(var i=0;i<2;i++){
		var first = "B'";
		var second = "S'";
		this.movingCube.horizontalaxialclockwise(first);
		this.movingCube.selfclockwise(first);
		this.movingCube.horizontalcounteraxialclockwise(second);
		}
	}
	
	
	
	if(operation==="x"){
		var first = "R";
		var second = "M'";
		var third = "L'";
		this.movingCube.axialclockwise(first);
		this.movingCube.axialclockwise(third);
		this.movingCube.axialclockwise(second);
		this.movingCube.selfclockwise(first);
		this.movingCube.selfcounterclockwise(second);

		
		
	}
	if(operation==="x2"){
		for(var i=0;i<2;i++){
			var first = "R";
			var second = "M'";
			var third = "L'";
			this.movingCube.axialclockwise(first);
			this.movingCube.axialclockwise(third);
			this.movingCube.axialclockwise(second);
			this.movingCube.selfclockwise(first);
			this.movingCube.selfcounterclockwise(second);
		}
	}
	if(operation==="x'"){
		var first="R'";
		var second="M";
		var third ="L";
		
		this.movingCube.axialcounterclockwise(first);
		this.movingCube.axialcounterclockwise(second);
		this.movingCube.axialcounterclockwise(third);
		this.movingCube.selfcounterclockwise(first);
		this.movingCube.selfclockwise(third);


		
		
	}
	if(operation==="x'2"){
		for(var i=0;i<2;i++){
			var first="R'";
			var second="M";
			var third ="L";
			
			this.movingCube.axialcounterclockwise(first);
			this.movingCube.axialcounterclockwise(second);
			this.movingCube.axialcounterclockwise(third);
			this.movingCube.selfcounterclockwise(first);
			this.movingCube.selfclockwise(third);

		}
	}
	if(operation==="y"){
		var first = "U";
		var second = "E'";
		var third = "D'";
		
		this.movingCube.horizontalclockwise(first);
		this.movingCube.horizontalclockwise(second);
		this.movingCube.horizontalclockwise(third);
		this.movingCube.selfclockwise(first);
		this.movingCube.selfcounterclockwise(third);
		
	}
	if(operation==="y2"){
		for(var i=0;i<2;i++){
			var first = "U";
			var second = "E'";
			var third = "D'";
			
			this.movingCube.horizontalclockwise(first);
			this.movingCube.horizontalclockwise(second);
			this.movingCube.horizontalclockwise(third);
			this.movingCube.selfclockwise(first);
			this.movingCube.selfcounterclockwise(third);
		}
	}
	if(operation==="y'"){
		var first="U'";
		var second="E";
		var third ="D";
		this.movingCube.horizontalcounterclockwise(first);
		this.movingCube.horizontalcounterclockwise(second);
		this.movingCube.horizontalcounterclockwise(third);
		this.movingCube.selfcounterclockwise(first);
		this.movingCube.selfclockwise(third);

		
		
	}
	if(operation==="y'2"){
		for(var i=0;i<2;i++){
			var first="U'";
			var second="E";
			var third ="D";
			this.movingCube.horizontalcounterclockwise(first);
			this.movingCube.horizontalcounterclockwise(second);
			this.movingCube.horizontalcounterclockwise(third);
			this.movingCube.selfcounterclockwise(first);
			this.movingCube.selfclockwise(third);
		}
	}
	if(operation==="z"){
		var first = "F";
		var second = "S";
		var third = "B'";
		this.movingCube.horizontalaxialclockwise(first);
		this.movingCube.horizontalaxialclockwise(second);
		this.movingCube.horizontalaxialclockwise(third);
		this.movingCube.selfclockwise(first);
		this.movingCube.selfcounterclockwise(third);
		
		
	}
	if(operation==="z2"){
		for(var i=0;i<2;i++){
			var first = "F";
			var second = "S";
			var third = "B'";
			this.movingCube.horizontalaxialclockwise(first);
			this.movingCube.horizontalaxialclockwise(second);
			this.movingCube.horizontalaxialclockwise(third);
			this.movingCube.selfclockwise(first);
			this.movingCube.selfcounterclockwise(third);
		}
	}
	if(operation==="z'"){
		var first="F'";
		var second="S'";
		var third ="B";
		this.movingCube.horizontalaxialcounterclockwise(first);
		this.movingCube.horizontalaxialcounterclockwise(second);
		this.movingCube.horizontalaxialcounterclockwise(third);
		this.movingCube.selfclockwise(first);
		this.movingCube.selfcounterclockwise(third);

		
	}
	if(operation==="z'2"){
		for(var i=0;i<2;i++){
			var first="F'";
			var second="S'";
			var third ="B";
			this.movingCube.horizontalaxialcounterclockwise(first);
			this.movingCube.horizontalaxialcounterclockwise(second);
			this.movingCube.horizontalaxialcounterclockwise(third);
			this.movingCube.selfclockwise(first);
			this.movingCube.selfcounterclockwise(third);
		}
	}
	


}
