import { Button } from "@/component/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/component/ui/dialog";
import GetMultipleAnswers from "@/utils/GeminiConfig";
import { GeneratePlotDialogProps } from "@/utils/type";
import { useState } from "react";

export function GeneratePlotDialog({setData,selectedText , isopen , setIsopen}: GeneratePlotDialogProps) {
  const [length, setLength] = useState("short");
  const [type, setType] = useState("next-scene");
  const [genre, setGenre] = useState("fantasy");
  async function handleClick(){
    const prompt = `Generate a ${length} plot for this story: "${selectedText}". Type: ${type}. Genre: ${genre}.`
    const result = await GetMultipleAnswers(prompt)
    if(result.every(item => item != undefined)){
      setData(result)
      console.log(result)
    }
    setIsopen(false);
  }
  return (
    <>
      <Dialog open={isopen} onOpenChange={setIsopen}>
        <DialogContent className="w-full max-sm:max-w-lg p-5 sm:p-6">
          <DialogHeader>
            <DialogTitle>Generate Plot Suggestions</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-white-3 rounded-md w-fit h-fit p-5 mt-6">
              <span className="text-black-2">Selected Text :</span>
              <p>{selectedText}</p>
            </div>
            <div className="border-t-2 flex flex-col sm:flex-row gap-4 sm:gap-10 items-center p-5">
              <div className="space-y-2 w-full">
                <label className="block">Length</label>
                <select
                    value={length}
                    className="w-full border-2 border-black-2 p-2 rounded-md"
                    onChange={(e) => setLength(e.target.value)}
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
              </div>
              <div className="space-y-2 w-full">
                <label className="block">Type</label>
                <select
                    className="w-full border-2 border-black-2 p-2 rounded-md"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                  <option value="next-scene">Next Scene</option>
                  <option value="dialogue">Character Dialogue</option>
                  <option value="twist">Plot Twist</option>
                  <option value="subplot">Subplot</option>
                </select>
              </div>
              <div className="space-y-2 w-full">
                <label className="block">Genre</label>
                <select
                    className="w-full border-2 border-black-2 p-2 rounded-md"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                >
                  <option value="fantasy">Fantasy</option>
                  <option value="adventure">Adventure</option>
                  <option value="romance">Romance</option>
                  <option value="mystery">Mystery</option>
                  <option value="sci-fi">Sci-Fi</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-end space-x-4">
            <Button onClick={() => setIsopen(false)}>Cancel</Button>
            <Button variant="outline" onClick={handleClick}>
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  );
}
