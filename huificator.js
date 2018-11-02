module.exports={
		
		encode1: function(a){
			if (a){
				var ss = a.split(" ")
				var word = ""
				if (ss.length>0){
					word = ss[ss.length-1]
					
					word = word.replace('!',"")
					word = word.replace('?',"")
					word = word.replace('.',"")
					word = word.replace('!',"")
					word = word.replace('?',"")
					word = word.replace('.',"")
					word = word.replace('!',"")
					
					word = this.encode(word)
				}
				return word +"!"
				
			}else{
				return a
			}
			
		},
		encode: function(a){
			

			if (a in [1,2,3,4,5,6,7,8,9,0]){
				return a;
			}
			
			if (a.length<=2){				
			      if ('уеыаоэяиюУЕЫАОЭЯИЮ'.indexOf(a[0])>-1){
			    	  return "хуй" + a  
			      }else{
			    	  return "хуе" + a
			      }
			    	  				
			}
			
			if (a.length>2 && a.length<=4){
			
				if ('уеыаоэяиюУЕЫАОЭЯИЮ'.indexOf(a[1])>-1){
					if ('уеыаоэяиюйцкнгшщзхфвпрлджчсмтб'.indexOf(a[0])>-1){
						return a.replace(/^./,"хуй")	
					}
					if ('УЕЫАОЭЯИЮЙЦКНГШЩЗХФВПРЛДЖЧСМТБ'.indexOf(a[0])>-1){
						return a.replace(/^./,"Хуй")	
					}
										
				}
				if ('йцкнгшщзхфвпрлджчсмтбЙЦКНГШЩЗХФВПРЛДЖЧСМТБ'.indexOf(a[1])>-1){
					if ('уеыаоэяиюйцкнгшщзхфвпрлджчсмтб'.indexOf(a[0])>-1){
						return a.replace(/^./,"хуе")	
					}
					if ('УЕЫАОЭЯИЮЙЦКНГШЩЗХФВПРЛДЖЧСМТБ'.indexOf(a[0])>-1){
						return a.replace(/^./,"Хуе")	
					}
				
				}
				
				return a;
			}
		    
		    	  
			if (a.length>4){							 
					if ('уеыаоэяиюУЕЫАОЭЯИЮ'.indexOf(a[2])>-1){
						if ('уеыаоэяиюйцкнгшщзхфвпрлджчсмтб'.indexOf(a[0])>-1){
							return a.replace(/^../,"хуй")	
						}
						if ('УЕЫАОЭЯИЮЙЦКНГШЩЗХФВПРЛДЖЧСМТБ'.indexOf(a[0])>-1){
							return a.replace(/^../,"Хуй")	
						}


					}
			      if ('йцкнгшщзхфвпрлджчсмтбЙЦКНГШЩЗХФВПРЛДЖЧСМТБ'.indexOf(a[2])>-1){
						if ('уеыаоэяиюйцкнгшщзхфвпрлджчсмтб'.indexOf(a[0])>-1){
							return a.replace(/^../,"хуе")	
						}
						if ('УЕЫАОЭЯИЮЙЦКНГШЩЗХФВПРЛДЖЧСМТБ'.indexOf(a[0])>-1){
							return a.replace(/^../,"Хуе")	
						}

			      }
			 
			    return a;
			}
				
			return a;
			
			/*
			def encoding_cyrillic(a)
			  for i in 0...a.size
			    if a[i]=~/[0-9]/
			      next
			    end
			    if a[i].size <=2
			      if a[i][0]=~/[уеыаоэяиюУЕЫАОЭЯИЮ]/
			        a[i] = "хуй" + a[i] 
			      else
			        a[i] = "хуе" + a[i]
			      end
			    elsif a[i].size > 2 && a[i].size <= 4
			      if a[i][1]=~/[уеыаоэяиюУЕЫАОЭЯИЮ]/
			        a[i].sub!(/^./, "хуй") if a[i][0]=~/[уеыаоэяиюйцкнгшщзхфвпрлджчсмтб]/
			        a[i].sub!(/^./, "Хуй") if a[i][0]=~/[УЕЫАОЭЯИЮЙЦКНГШЩЗХФВПРЛДЖЧСМТБ]/
			      end
			      if a[i][1]=~/[йцкнгшщзхфвпрлджчсмтбЙЦКНГШЩЗХФВПРЛДЖЧСМТБ]/
			        a[i].sub!(/^./, "хуе") if a[i][0]=~/[уеыаоэяиюйцкнгшщзхфвпрлджчсмтб]/
			        a[i].sub!(/^./, "Хуе") if a[i][0]=~/[УЕЫАОЭЯИЮЙЦКНГШЩЗХФВПРЛДЖЧСМТБ]/
			      end
			    else
			      if a[i][2]=~/[уеыаоэяиюУЕЫАОЭЯИЮ]/
			        a[i].sub!(/^../, "хуй") if a[i][0]=~/[уеыаоэяиюйцкнгшщзхфвпрлджчсмтб]/
			        a[i].sub!(/^../, "Хуй") if a[i][0]=~/[УЕЫАОЭЯИЮЙЦКНГШЩЗХФВПРЛДЖЧСМТБ]/
			      end
			      if a[i][2]=~/[йцкнгшщзхфвпрлджчсмтбЙЦКНГШЩЗХФВПРЛДЖЧСМТБ]/
			        a[i].sub!(/^../, "хуе") if a[i][0]=~/[уеыаоэяиюйцкнгшщзхфвпрлджчсмтб]/
			        a[i].sub!(/^../, "Хуе") if a[i][0]=~/[УЕЫАОЭЯИЮЙЦКНГШЩЗХФВПРЛДЖЧСМТБ]/
			      end
			    end
			    
			  end
			  return a
			end
			*/
		}
}