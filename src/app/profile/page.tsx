"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Calendar, LogOut, ChevronLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setName(currentUser.displayName || "");
            } else {
                router.push("/auth");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    const handleSave = async () => {
        if (!auth.currentUser) return;
        setSaving(true);
        try {
            await updateProfile(auth.currentUser, {
                displayName: name
            });
            // Update local state to reflect change
            setUser({ ...auth.currentUser, displayName: name });
        } catch (err) {
            console.error("Failed to update profile", err);
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/auth");
        } catch (err) {
            console.error("Failed to sign out", err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <Loader2 className="h-12 w-12 animate-spin text-accent" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-background p-4 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <Link href="/" className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors mb-4 group">
                            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                            Return to Dashboard
                        </Link>
                        <h1 className="text-4xl font-serif font-bold text-primary">Member Profile</h1>
                        <div className="h-1.5 w-20 bg-accent mt-2 rounded-full" />
                    </div>
                    <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                        <LogOut className="h-4 w-4 mr-2" />
                        Log Out
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
                    {/* Sidebar / Avatar */}
                    <div className="space-y-6">
                        <Card className="overflow-hidden border-none shadow-xl">
                            <div className="h-32 bg-primary relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-16 translate-x-16 blur-3xl pointer-events-none" />
                            </div>
                            <CardContent className="pt-0 relative flex flex-col items-center">
                                <div className="-mt-12 h-24 w-24 rounded-2xl bg-white p-1 shadow-2xl ring-4 ring-white">
                                    <div className="h-full w-full rounded-xl bg-accent flex items-center justify-center text-white text-3xl font-serif font-bold ring-2 ring-accent">
                                        {name ? name.substring(0, 1).toUpperCase() : "U"}
                                    </div>
                                </div>
                                <div className="text-center mt-6 pb-8 border-b border-border/50 w-full px-4">
                                    <h2 className="text-xl font-serif font-bold text-primary">{name || "Respected Member"}</h2>
                                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-bold">Respected Member</p>
                                </div>
                                <div className="w-full py-6 px-4 space-y-4">
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="p-2 bg-muted/30 rounded-lg">
                                            <Calendar className="h-4 w-4 text-primary opacity-60" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 leading-none mb-1">Status</p>
                                            <p className="font-semibold text-primary">Active</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="p-2 bg-muted/30 rounded-lg">
                                            <Mail className="h-4 w-4 text-primary opacity-60" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 leading-none mb-1">Email</p>
                                            <p className="font-semibold text-primary">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content / Settings */}
                    <div className="space-y-6">
                        <Card className="border-border/50 shadow-lg">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl font-serif">Account Settings</CardTitle>
                                <p className="text-sm text-muted-foreground">Manage your personal identification</p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Display Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="pl-10 h-11 bg-muted/20 border-border/50 focus-visible:ring-accent"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Email (Read-only)</label>
                                        <div className="relative opacity-60">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                value={user.email}
                                                disabled
                                                className="pl-10 h-11 bg-muted/5 border-border/50 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Button onClick={handleSave} disabled={saving} className="font-bold px-8 shadow-lg shadow-accent/10" variant="accent">
                                    {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                                    Save Changes
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-border/50 shadow-lg overflow-hidden group">
                            <div className="p-6 bg-primary text-white relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -translate-y-8 translate-x-8 blur-2xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                                <h3 className="text-lg font-serif italic opacity-90 relative z-10">"Excellence is not an act, but a habit."</h3>
                                <p className="text-[10px] uppercase font-bold tracking-widest mt-2 opacity-50 relative z-10">— Aristotle</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
