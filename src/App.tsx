import Header from "./components/common/Header";
import Content from "./components/common/Content";
import Footer from "./components/common/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      {/* Content */}
      <Content />
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
