"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetCompaniesQuery } from "@/frontend/gql/generated";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import { parseAsInteger, useQueryState } from "nuqs";
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
  PlusIcon,
  SearchIcon,
  BuildingIcon,
  MapPinIcon,
  CalendarIcon,
  UsersIcon,
  GlobeIcon,
  CheckIcon,
} from "lucide-react";
import { format } from "date-fns";

export default function CompaniesListPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useDebounceValue("", 500);
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  );
  const limit = 8; // Companies per page

  const { data, loading, error, refetch } = useGetCompaniesQuery({
    variables: {
      page: currentPage,
      limit,
      search: searchTerm,
    },
  });

  const totalPages = data?.companies
    ? Math.ceil(data.companies.total / limit)
    : 0;

  // Handle invalid page numbers
  useEffect(() => {
    if (data?.companies && totalPages > 0 && currentPage > totalPages) {
      // Redirect to the last valid page
      setCurrentPage(totalPages);
      toast.info("Page not found", {
        description: `Redirected to page ${totalPages} of ${totalPages}`,
      });
    }
  }, [data?.companies, currentPage, totalPages, setCurrentPage]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <div className="container mx-auto py-8 max-w-7xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">
              Error Loading Companies
            </CardTitle>
            <CardDescription>
              {error.message || "Failed to load companies"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => refetch()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <p className="text-muted-foreground">
            Browse and manage companies in your network
          </p>
        </div>
        <Button
          onClick={() => router.push("/companies/create")}
          className="flex items-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          Add Company
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search companies..."
            defaultValue=""
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="h-[254px]">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Companies Grid */}
      {!loading && data?.companies && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.companies.companies.map((company) => (
              <Card
                key={company.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push(`/companies/${company.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-1">
                        {company.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        {company.verified && (
                          <Badge
                            variant="default"
                            className="bg-green-100 text-green-800 hover:bg-green-100 text-xs"
                          >
                            <CheckIcon className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {company.industry && (
                          <Badge variant="secondary" className="text-xs">
                            {company.industry}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {company.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {company.description}
                      </p>
                    )}

                    <div className="space-y-1">
                      {company.hq && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPinIcon className="h-3 w-3" />
                          <span className="line-clamp-1">{company.hq}</span>
                        </div>
                      )}

                      {company.size && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <UsersIcon className="h-3 w-3" />
                          <span>{company.size}</span>
                        </div>
                      )}

                      {company.foundedIn && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CalendarIcon className="h-3 w-3" />
                          <span>
                            {format(new Date(company.foundedIn), "yyyy")}
                          </span>
                        </div>
                      )}

                      {company.website && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <GlobeIcon className="h-3 w-3" />
                          <span className="line-clamp-1">
                            {company.website}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {data.companies.companies.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <BuildingIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {data.companies.total === 0
                    ? "No companies found"
                    : "No companies on this page"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm
                    ? "No companies match your search criteria."
                    : data.companies.total === 0
                    ? "Get started by adding your first company."
                    : "Try navigating to a different page."}
                </p>
                {data.companies.total === 0 && (
                  <Button onClick={() => router.push("/companies/create")}>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Company
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Pagination */}
          {totalPages > 1 && data.companies.total > 0 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
              >
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page =
                    Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  if (page > totalPages) return null;

                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage >= totalPages}
              >
                Next
              </Button>
            </div>
          )}

          {/* Results Info */}
          {data.companies.total > 0 && (
            <div className="text-center text-sm text-muted-foreground mt-4">
              Showing {Math.max(1, (currentPage - 1) * limit + 1)} to{" "}
              {Math.min(currentPage * limit, data.companies.total)} of{" "}
              {data.companies.total} companies
            </div>
          )}
        </>
      )}
    </div>
  );
}
