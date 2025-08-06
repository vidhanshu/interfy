"use client";

import React, { useState } from "react";
import {
  useMeQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/frontend/gql/generated";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Edit3,
  Save,
  X,
  Loader2,
  LogOut,
  Trash2,
  LogOutIcon,
} from "lucide-react";
import { toast } from "sonner";
import { signOut, useSession } from "next-auth/react";
import ConfirmDialog from "@/components/common/confirm-dialog";

const ProfilePage = () => {
  const { data, loading, error, refetch } = useMeQuery();
  const [updateUser, { loading: updating }] = useUpdateUserMutation();
  const [deleteUser, { loading: deleting }] = useDeleteUserMutation();
  const { update: updateSession } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Initialize form data when user data is loaded
  React.useEffect(() => {
    if (data?.me) {
      setFormData({
        name: data.me.name || "",
        email: data.me.email || "",
      });
    }
  }, [data?.me]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const variables: any = {};
      if (formData.name !== data?.me?.name) {
        variables.name = formData.name;
      }
      if (formData.email !== data?.me?.email) {
        variables.email = formData.email;
      }

      if (Object.keys(variables).length === 0) {
        setIsEditing(false);
        return;
      }

      await updateUser({ variables });
      await refetch();
      setIsEditing(false);
      toast.success("Profile updated successfully!");

      // Refresh the session to get updated user data
      await updateSession();
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: data?.me?.name || "",
      email: data?.me?.email || "",
    });
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/landing" });
      toast.success("Signed out successfully");
    } catch (error: any) {
      toast.error("Failed to sign out");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
      toast.success("Account deleted successfully");
      await signOut({ callbackUrl: "/landing" });
    } catch (error: any) {
      toast.error(error.message || "Failed to delete account");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <p>Failed to load profile</p>
              <Button
                variant="outline"
                onClick={() => refetch()}
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data?.me) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p>No user data found</p>
              <p className="text-sm text-gray-500 mt-2">
                Please sign in to view your profile
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary/5 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-semibold text-gray-900">
                  Personal Information
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Update your profile details
                </CardDescription>
              </div>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit</span>
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Full Name</span>
              </Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 p-3 h-auto md:text-base"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-md border">
                  <span className="text-gray-900">
                    {data.me.name || "Not provided"}
                  </span>
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 flex items-center space-x-2"
              >
                <Mail className="h-4 w-4" />
                <span>Email Address</span>
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email address"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 p-3 h-auto md:text-base"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-md border">
                  <span className="text-gray-900">{data.me.email}</span>
                </div>
              )}
            </div>

            {/* User ID (Read-only) */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                User ID
              </Label>
              <div className="p-3 bg-gray-50 rounded-md border">
                <span className="text-gray-500 font-mono text-sm">
                  {data.me.id}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={updating}
                  className="flex items-center space-x-2"
                >
                  {updating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span>{updating ? "Saving..." : "Save Changes"}</span>
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Info Card */}
        <Card className="mt-6 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Account Created
                </Label>
                <div className="p-3 bg-gray-50 rounded-md border">
                  <span className="text-gray-600 text-sm">
                    {data.me.createdAt
                      ? new Date(data.me.createdAt).toLocaleDateString()
                      : "Not available"}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Last Updated
                </Label>
                <div className="p-3 bg-gray-50 rounded-md border">
                  <span className="text-gray-600 text-sm">
                    {data.me.updatedAt
                      ? new Date(data.me.updatedAt).toLocaleDateString()
                      : "Not available"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 shadow-lg border border-destructive/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-destructive">
              Danger Zone
            </CardTitle>
            <CardDescription className="text-destructive/70">
              These actions are sensitive. Please proceed with caution.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex md:items-center flex-col md:flex-row gap-2 md:gap-0 justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <LogOut className="h-5 w-5 text-gray-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Sign Out</h3>
                    <p className="text-sm text-gray-500">
                      Sign out of your account
                    </p>
                  </div>
                </div>
                <ConfirmDialog
                  variant="destructive"
                  onConfirm={handleSignOut}
                  subtitle="You'll be signed out of the account, and will have to sign in again next time"
                >
                  <Button
                    variant="destructive-outline"
                    className="text-gray-700 hover:text-gray-900 flex gap-x-2 items-center  w-fit self-end md:self-auto md:w-auto"
                  >
                    <LogOutIcon className="h-4 w-4" />
                    Sign Out
                  </Button>
                </ConfirmDialog>
              </div>

              <div className="flex md:items-center justify-between flex-col md:flex-row gap-2 md:gap-0 p-4 border border-red-200 rounded-lg bg-red-50">
                <div className="flex items-center space-x-3">
                  <Trash2 className="h-5 w-5 text-red-600" />
                  <div>
                    <h3 className="font-medium text-red-900">Delete Account</h3>
                    <p className="text-sm text-red-600">
                      Permanently delete your account and all data
                    </p>
                  </div>
                </div>
                <ConfirmDialog
                  variant="destructive"
                  subtitle="Are you sure you want to delete your account? This action cannot be undone."
                  onConfirm={handleDeleteAccount}
                >
                  <Button
                    variant="destructive"
                    disabled={deleting}
                    className="flex items-center space-x-2 w-fit self-end md:self-auto md:w-auto"
                  >
                    {deleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    <span>{deleting ? "Deleting..." : "Delete Account"}</span>
                  </Button>
                </ConfirmDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
