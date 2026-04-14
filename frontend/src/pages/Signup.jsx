// Signup page component
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
    console.log("Signup button clicked");

    try {
        const response = await axios.post(
            "http://localhost:5000/api/auth/signup",
            {
                name,
                email,
                password
            }
        );

        alert(response.data.message);
	navigate("/login");

    } catch (error) {
        alert("Signup failed");
	navigate("/login");
    }
};

    return (
        <div>
            <h2>Signup</h2>

            <input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />

            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleSignup}>
                Signup
            </button>
        </div>
    );
}

export default Signup;
