import  {GoogleGenerativeAI} from "@google/generative-ai"



const genAI = new GoogleGenerativeAI("AIzaSyBO3GPet4N0deLoXGLHsvsdQvS_AYye7zM");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


async function GenerateText(prompt : string){
    try {
        const resp = await model.generateContent(prompt);
        const result = resp.response.text();
        return result;
    }    
    catch(error){
        console.log(error)
    }
}



async function GetMultipleAnswers(text : string){
    const tasks = []
    for(let  i = 0 ; i < 4 ; i++){
        const prompt = `${text} (Response ${i+1})`;
        tasks.push(GenerateText(prompt))
    }
    const responses = await Promise.all(tasks);
    return responses
}


export default GetMultipleAnswers