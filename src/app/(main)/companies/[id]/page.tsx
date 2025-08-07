"use client";

import { useParams } from "next/navigation";
import { useGetCompanyQuery } from "@/frontend/gql/generated";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarIcon,
  GlobeIcon,
  MapPinIcon,
  BuildingIcon,
  UsersIcon,
  TargetIcon,
} from "lucide-react";
import { format } from "date-fns";

export default function CompanyPage() {
  const params = useParams();
  const companyId = params.id as string;

  const { data, loading, error } = useGetCompanyQuery({
    variables: { id: companyId },
    skip: !companyId,
  });

  if (loading) {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">
              Error Loading Company
            </CardTitle>
            <CardDescription>
              {error.message || "Failed to load company details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const company = data?.company;

  if (!company) {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Company Not Found</CardTitle>
            <CardDescription>
              The company you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {company.name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              {company.verified && (
                <Badge
                  variant="default"
                  className="bg-green-100 text-green-800 hover:bg-green-100"
                >
                  Verified
                </Badge>
              )}
              {company.industry && (
                <Badge variant="secondary">{company.industry}</Badge>
              )}
            </div>
          </div>
          <Button variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BuildingIcon className="h-5 w-5" />
                Company Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {company.description && (
                <div>
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {company.description}
                  </p>
                </div>
              )}

              {company.mission && (
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <TargetIcon className="h-4 w-4" />
                    Mission
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {company.mission}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Company Details */}
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {company.website && (
                  <div className="flex items-center gap-2">
                    <GlobeIcon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Website</p>
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {company.website}
                      </a>
                    </div>
                  </div>
                )}

                {company.hq && (
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Headquarters</p>
                      <p className="text-sm text-muted-foreground">
                        {company.hq}
                      </p>
                    </div>
                  </div>
                )}

                {company.size && (
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Company Size</p>
                      <p className="text-sm text-muted-foreground">
                        {company.size}
                      </p>
                    </div>
                  </div>
                )}

                {company.foundedIn && (
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Founded</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(company.foundedIn), "MMMM yyyy")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Company Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Company ID
                </p>
                <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                  {company.id}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Created
                </p>
                <p className="text-sm">
                  {company.createdAt &&
                    format(new Date(company.createdAt), "PPP")}
                </p>
              </div>

              {company.updatedAt && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Last Updated
                  </p>
                  <p className="text-sm">
                    {format(new Date(company.updatedAt), "PPP")}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Created By */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Created By</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium">
                    {company.createdBy.name || "Unknown"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {company.createdBy.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                Edit Company
              </Button>
              <Button className="w-full" variant="outline">
                View Jobs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
