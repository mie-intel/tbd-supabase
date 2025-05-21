import DefaultLayout from "@/components/DefaultLayout";
import Container from "@/components/Container";

export default async function Page() {
  return (
    <>
      <div className="relative flex h-full w-full items-center justify-center">
        <Container className="relative flex h-[40%] w-[30%] items-center justify-center bg-white/30 text-white">
          Arau
        </Container>
      </div>
    </>
  );
}
