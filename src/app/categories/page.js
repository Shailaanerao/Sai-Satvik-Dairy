import Navbar from "@/components/ui/Navbar/Navbar";
import CategoryHero from "@/components/ui/Categories/CategoryHero";
import CategoryGrid from "@/components/ui/Categories/CategoryGrid";
import "./Categories.css";

export const metadata = {
  title: "All Categories | Sai Satvik Dairy",
  description: "Browse all pure A2 dairy categories from Sai Satvik Dairy.",
};

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main className="categories-page-wrapper">
        <CategoryHero />
        <section className="categories-main-section">
          <CategoryGrid />
        </section>
      </main>
    </>
  );
}