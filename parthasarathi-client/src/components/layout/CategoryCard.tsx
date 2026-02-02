interface CategoryCardProps {
  name: string;
  imageUrl?: string;
}

function CategoryCard({ name, imageUrl }: CategoryCardProps) {
  // Real vintage-style instrument placeholders if no image is provided
  const placeholders: Record<string, string> = {
    Strings:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2ciS4zbeOzzzs38NrDJHm1ii2Fwo8wK7XlLQsw0Nug09dSI_0R3vjyg1EABm7vK-fIk-XrsKuFWVpE1yttj87XAifCqhht3zZ3oDMXipKoGIVjdCy6wi80dyCoqZmbZxzPFtZ-xnDtOtVIkFMoRMDPstwTmatEs_iajx1KLt98WsAZeXsfOkva_3o7o19Sj0BvCv3_fcU8hEF5b_A82eN7ctbT5R3Aq0E3MRIBos46yEnMAP5UNJFpWPwii7syGSN9ZKnthaC7YLB",

    Keyboard:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_QPvrJN-D1jm-F9h6L2CsrLUyeydBIkfBs7-TrHHu_HuP6lWL0VDQGuqlGckaIlGAEUDddc3aXgGKPv31WsUi4ysqeWo_f7XLw26uMhN6UYLp0_YjWtvfQzqQmA_JHjR9PkrVTJTvFfVW3bw2Rf6JPJ8FJ1D5_iJO1io4MJMOC6YmbPpzmKO4hMzHIWZTxxYkDCnHi_6xZA0yjS890urTccEjR8jM0X2DKh0In56NhTQdiQExQVExRQ4u0NmnXU2aUAAV_RfQd4TH",

    Percussion:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBgyo2IHLzOU6LZyN_8mkVWuWLz6RRYCbLRf7hQya6jaiXY1uHKT9CxUl4L4EneEslrP8l7HuNM07T22pV_z7YlaUAgKQLGV36LEkYA9HhTYCNv6JaPj22F40p90HuBzKQaw19_KPpo_VZvqKcILAclh9G8F4Wenlt3HqIFg7qRMhACKp0eclwuCtkpFbrBXQSMxqi7HyxH2FMUll8KBNyW49wYVbv2F3z7KYQsEvGJSeI92eUQ_bWlksMmtfv4gtyWfVOGseD7Skbn",

    Wind: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMj8A3UF9dGbhchXYYPaX8_GNcB3lDeom5W2MJd1Dzspl4wOZCK45XNSXCK6C9h11_nXzZdwgtmZBWKM7CTJ_Z2Ov1caMejKeq9ySSecHZf9aSxzXoPYJohXBTKTXfBTu8b_-J_z-ttOmVB05FDR2rEFzk9Nhtrv8dJFNKeEYUczcAVQB53m19i67u42Tv5SVF4MWKBkLErNAu3LFiIt0QKrv_3omzm_3Ju92ki1T5jPC0GXeWo0v4kHS3xpEzlRcXx9iEtLAFRJJI",

    Electronic:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDeV1WrFcZkxyeSf6psKwR9Oairga1oH91IaUQl9_eOCWH8By3j4cTN-vsI4l2TqmP1GB8AR6KKhBoApuF94Xbkm5DTSGofAnRnhdp7BMaXExW3j1msAwhSm-hOKCeZdNZRdZ2slSEImNAbm9yos71JwmriaXNnF9junV2JMhP05q2bX9kiD5sE9utVOrRTxucgH26qZogXCE7c8g4zHZEM_cktShB5pxZ3O7wGlTX7gEvAVb6gCyBUwDvU_SYXIsyIO6vdJH4Yn1YH",

    Accessories:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBd3kd-D_bBVzdavA26kIXpvBrPUlwa1ox-WEFWSV7Rj2YVsNHlWmy9eL9IfbsnNLLiwKWHrSb0e_GEpt3Y76nblE4ettJSfI9PzMns4A9tTBZYL7UuGcGLdW0aF1tAwVlp3DvnJcbymQs0oC2jvpNudNGwpXtoPSgIIp_0J7haciIKgJp3h15_MeAUfqWX5J00jRoihNIul1-BSq2fn2KmcWHKwaL2nFhWTFrUYUjlcBRdaFazw8A2EYtEPypCoRWmgdsUguzv4lN1",
  };

  const finalImage =
    imageUrl && imageUrl !== "https://..." ? imageUrl : placeholders[name];

  return (
    <div className="group cursor-pointer">
      <div className="aspect-square rounded-xl overflow-hidden mb-3 relative border border-[#f4f0e7] shadow-sm group-hover:shadow-lg transition-all duration-500">
        {/* The Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${finalImage})` }}
        />

        {/* Vintage Overlay - Darker and sharper like your HTML example */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>

        {/* Label - Positioned bottom-left with sharp Playfair font */}
        <div className="absolute bottom-4 left-4">
          <p className="font-brand text-white font-bold text-xl tracking-wide drop-shadow-md">
            {name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
