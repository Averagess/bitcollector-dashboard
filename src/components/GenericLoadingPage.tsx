import MainContent from "./MainContent";
import NavBar from "./NavBar";
import PageContainer from "./PageContainer";

const GenericLoadingPage = () => {
  return (
    <PageContainer>
      <NavBar />
      <MainContent classes="my-auto">
        <div className="m-auto w-80 h-80 border-sky-500 border-4 border-l-white rounded-full animate-spin-slow" />
      </MainContent>
    </PageContainer>
  );
};

export default GenericLoadingPage;
