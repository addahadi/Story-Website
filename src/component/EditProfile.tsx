import { useState } from "react";
import { Button } from "@/component/ui/button.tsx";
import { db } from "@/utils/FirebaseConfig";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import Loading from "react-simple-loading";
const EditProfile = ({ profileId }: { profileId: string }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function HandleSave() {
    try {
      setLoading(true);
      await db.collection("user").doc(profileId).update({
        desc: text,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      navigate(`/profile/${profileId}`);
    }
  }
  return (
    <div className="p-6 flex-1">
      <div className="flex flex-col gap-3">
        <div className=" border-b-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border-none resize-none text-lg outline-none h-[300px] w-full"
            placeholder="Write Here"
          ></textarea>
        </div>

        <div className="flex flex-row-reverse gap-3 self-end">
          <Button className=" rounded-full" onClick={HandleSave}>
            {loading ? <Loading size={"20px"} /> : <span>Save</span>}
          </Button>
          <Button
            className=" rounded-full"
            variant="outline"
            onClick={() => navigate(`/profile/$profileId`)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
export default EditProfile;
