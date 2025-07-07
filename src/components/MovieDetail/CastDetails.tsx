const CastDetails = ({ mediaCredits }: any) => {
  return (
    <div>
        <div
          data-orientation="horizontal"
          role="none"
          className="shrink-0 bg-border h-[1px] w-full my-6 sm:my-8"
        ></div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-primary flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-users h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Cast
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {mediaCredits?.cast?.map((castMember: any) => {
            return (
              <div key={castMember?.id}>
                <div className="text-center bg-[#262239] p-3 sm:p-4 rounded-lg shadow-md hover:shadow-primary/20 transition-shadow">
                  <span className="relative flex shrink-0 overflow-hidden w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-2 sm:mb-3 border-2 border-[#9174e780] rounded-lg">
                    <img
                      className="aspect-square h-full w-full object-cover"
                      alt="Keanu Reeves"
                      data-ai-hint="person headshot"
                      src={castMember?.profile_path || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdMurvGfBtA88fd_OA2pkGVq0E77AD_dD0Ew&s"}
                    />
                  </span>
                  <p className="font-semibold text-foreground text-sm sm:text-base">
                    {castMember?.name || "Unknown Actor"}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {castMember?.character || "Unknown Character"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
  );
};

export default CastDetails;
