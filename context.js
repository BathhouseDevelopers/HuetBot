glbQuizz = {}
glbAI = {}

module.exports = {
		init: function(done){			
			DAO.quizz2.getQuizz2(function(data){				
				glbQuizz = data				
				DAO.ai.getAI(function(data){				
					glbAI = data	
					if (!glbAI.girlCount){
						glbAI.girlCount = 0;						
					}
					if (!glbAI.memCount){
						glbAI.memCount = 0;						
					}
					if (!glbAI.quizzCount){
						glbAI.quizzCount = 0;						
					}
					if (!glbAI.factCount){
						glbAI.factCount = 0;						
					}
					
					if (done){
						done()
					}
				})								
			})
			
		}

}