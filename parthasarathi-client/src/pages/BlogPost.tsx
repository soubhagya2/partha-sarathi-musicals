import { useParams, Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import { Calendar, User, Tag, Share2, ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();

  // Mock post data
  const post = {
    id: id || "1",
    title: "The Art of Maintaining Your Sitar: A Master's Guide",
    subtitle: "Preserving the divine resonance for generations to come.",
    author: "Pandit Ravi Shankar",
    date: "Oct 12, 2023",
    category: "Maintenance",
    imageUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80",
    content: [
      {
        type: "paragraph",
        text: "The Sitar is not merely an instrument; it is a living entity that breathes through its strings and resonates within its gourd. To own a Sitar is to be a custodian of a centuries-old tradition. However, the delicate nature of its construction—seasoned toon wood, delicate bridges (jawari), and sympathetic strings—requires meticulous care.",
      },
      {
        type: "heading",
        text: "Seasonal Care and Humidity",
      },
      {
        type: "paragraph",
        text: "Wood is sensitive to the environment. In the humid months of the monsoon, the wood expands, potentially affecting the action of the strings. Conversely, the dry heat of summer can cause cracks in the tumba (gourd). We recommend keeping your instrument in a temperature-controlled environment, ideally between 40% and 60% humidity.",
      },
      {
        type: "blockquote",
        text: "A well-maintained instrument is the bridge between the musician's soul and the listener's heart.",
      },
      {
        type: "heading",
        text: "The Importance of Jawari",
      },
      {
        type: "paragraph",
        text: "The bridge, or jawari, is the most critical component for the Sitar's unique 'buzzing' sound. Over time, the strings wear grooves into the bridge, dulling the resonance. Periodic 'open-bridge' service by a master craftsman is essential to restore the tonal clarity.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <Breadcrumbs
          items={[
            { label: "Musical Insights", href: "/blog" },
            { label: post.title },
          ]}
        />

        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-ui font-bold text-orange-600 mb-8 hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft className="size-4" /> Back to Insights
        </Link>

        {/* Metadata */}
        <div className="flex items-center gap-6 text-sm font-helper text-amber-800/60 mb-8">
          <span className="flex items-center gap-2">
            <Calendar className="size-4" /> {post.date}
          </span>
          <span className="flex items-center gap-2">
            <User className="size-4" /> {post.author}
          </span>
          <span className="flex items-center gap-2">
            <Tag className="size-4" /> {post.category}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="font-content text-4xl lg:text-5xl font-bold text-amber-950 mb-4 leading-tight">
          {post.title}
        </h1>
        <p className="font-content text-xl lg:text-2xl italic text-amber-800/70 mb-12">
          {post.subtitle}
        </p>

        {/* Featured Image */}
        <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-2xl shadow-orange-900/10">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-8">
          {post.content.map((item, index) => {
            if (item.type === "paragraph") {
              return (
                <p
                  key={index}
                  className="font-content text-lg text-amber-900/80 leading-relaxed"
                >
                  {item.text}
                </p>
              );
            }
            if (item.type === "heading") {
              return (
                <h2
                  key={index}
                  className="font-ui text-2xl font-bold text-amber-950 pt-4"
                >
                  {item.text}
                </h2>
              );
            }
            if (item.type === "blockquote") {
              return (
                <blockquote
                  key={index}
                  className="border-l-4 border-orange-500 pl-8 py-4 my-12"
                >
                  <p className="font-content text-2xl italic text-orange-900/70 leading-relaxed">
                    "{item.text}"
                  </p>
                </blockquote>
              );
            }
            return null;
          })}
        </div>

        {/* Footer / Share */}
        <div className="mt-20 pt-10 border-t border-amber-100 flex justify-between items-center">
          <div className="flex gap-4">
            <button className="p-3 rounded-full bg-amber-50 text-amber-900 hover:bg-orange-600 hover:text-white transition-all">
              <Share2 className="size-5" />
            </button>
          </div>
          <Link
            to="/blog"
            className="font-ui font-bold text-orange-600 hover:underline"
          >
            Read More Articles
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
