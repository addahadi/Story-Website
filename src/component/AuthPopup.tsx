import { useState } from "react";

import { Button } from "@/components/ui/button";

import { signInWithEmailAndPassword, createUserWithEmailAndPassword , signInWithPopup } from "firebase/auth";
import {Dialog, DialogContent} from "@/component/ui/dialog.tsx";
import {Input} from "@/component/ui/input.tsx";
import {Auth, provider} from "@/utils/FirebaseConfig.tsx";
import {AuthPopupProps} from "@/utils/type.tsx";
import {useNavigate} from "react-router-dom";

const AuthPopup = ({isLogin , setIsLogin , setIsopen , isopen} : AuthPopupProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();



    function handleSignIn() {
        signInWithPopup(Auth , provider).then((result) => {
            if(result){
                navigate("/");
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleAuth = async () => {
        setLoading(true);
        setError("");
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(Auth, email, password);
                navigate("/")
            } else {
                if (password !== confirmPassword) {
                    setError("Passwords do not match");
                    setLoading(false);
                    return;
                }
                await createUserWithEmailAndPassword(Auth, email, password);
                navigate("/")
            }
        } catch (err) {
            const str : Record<string , string> = err as Record<string , string>
            setError(str.message);
        }
        setLoading(false);
    };

    return (
        <Dialog open={isopen} onOpenChange={setIsopen}>
            <DialogContent>
                <h2 className="text-lg font-semibold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {!isLogin && (
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                )}
                <Button onClick={handleAuth} disabled={loading} className=" bg-orange-1 text-white-1 border border-orange-1 hover:bg-orange-2 hover:text-black-1 " >
                    {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
                </Button>
                <Button onClick={handleSignIn} className=" bg-orange-1 text-white-1 border border-orange-1 hover:bg-orange-2 hover:text-black-1" >
                    Sign in with Google
                </Button>
                <p className="text-sm mt-2 cursor-pointer text-blue-500" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
                </p>
            </DialogContent>
        </Dialog>
    );
};

export default AuthPopup;
