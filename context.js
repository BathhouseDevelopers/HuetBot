glbQuizz = {}



module.exports = {
		init: function(done){
			
			DAO.quizz2.getQuizz2(function(data){				
				glbQuizz = data				
				if (done){
					done()
				}
			})
			
		}

}