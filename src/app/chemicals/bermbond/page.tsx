import { SpecialtyProductPage } from "@/components/specialty/SpecialtyProductPage";
import { bermbond, specialtyMetadata } from "@/lib/specialtyProducts";

export const dynamic = "force-static";
export const metadata = specialtyMetadata(bermbond);

export default function BermBondPage() {
  return <SpecialtyProductPage product={bermbond} />;
}
