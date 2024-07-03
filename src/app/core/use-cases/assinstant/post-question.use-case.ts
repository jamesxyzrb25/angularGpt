import { QuestionResponse } from "@interfaces/question.response";
import { environment } from "environments/environment";

export const postQuestionUseCase = async(threadId: string, question:string)=>{
    try{
        const resp = await fetch(`${environment.assistantApi}/user-question`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({  threadId:threadId, question:question})
        });
        console.log(resp);
        const replies = await resp.json() as QuestionResponse[];


        return replies;
        
    }catch(error){
        throw new Error('Error creating thread ID')
    }
}