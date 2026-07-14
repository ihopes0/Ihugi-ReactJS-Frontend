import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/authService";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const result = await login(email, password);

            localStorage.setItem("token", result.token);

            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            style={{
                maxWidth: 400,
                margin: "100px auto",
                padding: 24,
                border: "1px solid #ddd",
                borderRadius: 8,
            }}
        >
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 12 }}>
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: "100%",
                            padding: 8,
                            marginTop: 4,
                        }}
                        required
                    />
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: "100%",
                            padding: 8,
                            marginTop: 4,
                        }}
                        required
                    />
                </div>

                {error && (
                    <div
                        style={{
                            color: "red",
                            marginBottom: 12,
                        }}
                    >
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: 10,
                    }}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}