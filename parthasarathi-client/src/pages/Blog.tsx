import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const posts = [
    {
      id: "1",
      title: "The Art of Maintaining Your Sitar: A Master's Guide",
      excerpt:
        "Discover the secrets to preserving the divine resonance of your Sitar through proper seasonal care and string maintenance.",
      author: "Pandit Ravi Shankar",
      date: "Oct 12, 2023",
      category: "Maintenance",
      imageUrl:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
    },
    {
      id: "2",
      title: "Understanding Ragas: The Soul of Indian Classical Music",
      excerpt:
        "An introductory journey into the complex and beautiful world of Ragas, the melodic frameworks of our heritage.",
      author: "Meera Bai",
      date: "Sep 28, 2023",
      category: "Education",
      imageUrl:
        "https://images.unsplash.com/photo-1514466750727-39f2f283f577?w=800&q=80",
    },
    {
      id: "3",
      title: "Modern Fusion: Bridging Traditional and Electronic Sounds",
      excerpt:
        "How contemporary artists are integrating ancient instruments with modern synthesizers to create new sonic landscapes.",
      author: "Arjun Mehta",
      date: "Sep 15, 2023",
      category: "Innovation",
      imageUrl:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <Breadcrumbs items={[{ label: "Musical Insights" }]} />

        <div className="text-center mb-16">
          <h1 className="font-helper text-5xl lg:text-6xl font-semibold text-amber-950 mb-4">
            Musical Insights
          </h1>
          <p className="font-ui text-lg text-amber-800/60 max-w-2xl mx-auto">
            Explore stories, tutorials, and deep dives into the world of
            traditional and modern music.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col bg-white rounded-3xl border border-amber-100 overflow-hidden hover:shadow-xl hover:shadow-orange-900/5 transition-all duration-500"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-orange-600">
                  {post.category}
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-amber-800/40 font-helper mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="size-3.5" /> {post.author}
                  </span>
                </div>

                <h2 className="font-helper text-2xl font-semibold text-amber-950 mb-4 group-hover:text-orange-600 transition-colors leading-tight">
                  {post.title}
                </h2>

                <p className="font-content text-amber-800/70 text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>

                <Link
                  to={`/blog/${post.id}`}
                  className="font-ui inline-flex items-center gap-2 text-sm font-bold text-amber-950 hover:text-orange-600 transition-colors group/link"
                >
                  Read Article{" "}
                  <ArrowRight className="size-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
