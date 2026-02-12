"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Crown, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, {
                    displayName: name
                });
            }
            router.push("/");
        } catch (err: any) {
            setError(err.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-accent" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center justify-center p-3 bg-primary rounded-2xl mb-4 shadow-xl ring-4 ring-accent/10">
                    <Crown className="h-8 w-8 text-accent animate-pulse" />
                </div>
                <h1 className="text-4xl font-serif font-bold text-primary tracking-tight">NxtLvl Tracker</h1>
                <p className="text-muted-foreground mt-2 font-medium tracking-wide uppercase text-[10px]">Elegance in Every Achievement</p>
            </div>

            <Card className="w-full max-w-md border-border/50 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl font-serif">{isLogin ? "Welcome Back" : "Join the Elite"}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        {isLogin ? "Continue your journey to excellence" : "Start tracking with sophisticated precision"}
                    </p>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-[11px] font-bold uppercase tracking-wider text-center">
                                {error}
                            </div>
                        )}
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Your Name"
                                        className="pl-10 h-11 bg-muted/20 border-border/50 focus-visible:ring-accent"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-10 h-11 bg-muted/20 border-border/50 focus-visible:ring-accent"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10 h-11 bg-muted/20 border-border/50 focus-visible:ring-accent"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" disabled={loading} className="w-full h-11 font-bold group shadow-lg shadow-accent/10" variant="accent">
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                                <>
                                    {isLogin ? "Login to Dashboard" : "Create Account"}
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 border-t border-border/50 bg-muted/5 py-6">
                    <p className="text-xs text-center text-muted-foreground">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-1 text-accent font-bold hover:underline"
                        >
                            {isLogin ? "Sign Up" : "Log In"}
                        </button>
                    </p>
                    <Link href="/" className="text-[10px] text-muted-foreground/40 hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-widest font-bold">
                        Back to overview
                    </Link>
                </CardFooter>
            </Card>

            <footer className="mt-12 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/30">
                © 2026 Crafted for Excellence
            </footer>
        </div>
    );
}
