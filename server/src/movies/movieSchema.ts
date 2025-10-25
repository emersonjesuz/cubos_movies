import z from "zod";

export const movieSchema = z.object({
  title: z
    .string({ error: "MESSAGE: The field 'title' is obligatory. CODE: TITLE_IS_OBLIGATORY" })
    .min(1, { message: "MESSAGE: The field 'title' cannot be empty. CODE: TITLE_IS_EMPTY" }),

  originalTitle: z
    .string({ error: "MESSAGE: The field 'originalTitle' is obligatory. CODE: ORIGINAL_TITLE_IS_OBLIGATORY" })
    .min(1, { message: "MESSAGE: The field 'originalTitle' cannot be empty. CODE: ORIGINAL_TITLE_IS_EMPTY" }),

  synopsis: z
    .string({ error: "MESSAGE: The field 'synopsis' is obligatory. CODE: SYNOPSIS_IS_OBLIGATORY" })
    .min(1, { message: "MESSAGE: The field 'synopsis' cannot be empty. CODE: SYNOPSIS_IS_EMPTY" }),

  description: z
    .string({ error: "MESSAGE: The field 'description' is obligatory. CODE: DESCRIPTION_IS_OBLIGATORY" })
    .min(1, { message: "MESSAGE: The field 'description' cannot be empty. CODE: DESCRIPTION_IS_EMPTY" }),

  popularity: z
    .string({ error: "MESSAGE: The field 'popularity' is obligatory. CODE: POPULARITY_IS_OBLIGATORY" })
    .min(1, { message: "MESSAGE: The field 'popularity' cannot be empty. CODE: POPULARITY_IS_EMPTY" }),

  release: z.coerce.date({ error: "MESSAGE: The field 'release' must be a valid date. CODE: RELEASE_IS_INVALID" }),

  budget: z
    .number({ error: "MESSAGE: The field 'budget' is obligatory. CODE: BUDGET_IS_OBLIGATORY" })
    .nonnegative({ message: "MESSAGE: The field 'budget' cannot be negative. CODE: BUDGET_IS_NEGATIVE" }),

  revenue: z
    .number({ error: "MESSAGE: The field 'revenue' is obligatory. CODE: REVENUE_IS_OBLIGATORY" })
    .nonnegative({ message: "MESSAGE: The field 'revenue' cannot be negative. CODE: REVENUE_IS_NEGATIVE" }),

  votes: z
    .number({ error: "MESSAGE: The field 'votes' is obligatory. CODE: VOTES_IS_OBLIGATORY" })
    .int({ message: "MESSAGE: The field 'votes' must be an integer. CODE: VOTES_IS_NOT_INTEGER" })
    .nonnegative({ message: "MESSAGE: The field 'votes' cannot be negative. CODE: VOTES_IS_NEGATIVE" }),

  duration: z
    .string({
      error: "MESSAGE: The field 'duration' is obligatory. CODE: DURATION_IS_OBLIGATORY",
    })
    .min(1, {
      message: "MESSAGE: The field 'duration' cannot be empty. CODE: DURATION_IS_EMPTY",
    })
    .regex(/^\d+$/, {
      message: "MESSAGE: The field 'duration' must be a number in minutes. CODE: DURATION_MUST_BE_NUMBER",
    }),

  language: z
    .string({ error: "MESSAGE: The field 'language' is obligatory. CODE: LANGUAGE_IS_OBLIGATORY" })
    .min(1, { message: "MESSAGE: The field 'language' cannot be empty. CODE: LANGUAGE_IS_EMPTY" }),

  profit: z.number({ error: "MESSAGE: The field 'profit' must be a number. CODE: PROFIT_IS_INVALID" }).optional().default(0),

  status: z
    .string({ error: "MESSAGE: The field 'status' is obligatory. CODE: STATUS_IS_OBLIGATORY" })
    .min(1, { message: "MESSAGE: The field 'status' cannot be empty. CODE: STATUS_IS_EMPTY" }),

  urlCover: z
    .string({ error: "MESSAGE: The field 'urlCover' is obligatory. CODE: URL_COVER_IS_OBLIGATORY" })
    .url({ message: "MESSAGE: The field 'urlCover' must be a valid URL. CODE: URL_COVER_IS_INVALID" }),

  urlBackground: z
    .string({ error: "MESSAGE: The field 'urlBackground' is obligatory. CODE: URL_BACKGROUND_IS_OBLIGATORY" })
    .url({ message: "MESSAGE: The field 'urlBackground' must be a valid URL. CODE: URL_BACKGROUND_IS_INVALID" }),

  urlTrailer: z
    .string({ error: "MESSAGE: The field 'urlTrailer' is obligatory. CODE: URL_TRAILER_IS_OBLIGATORY" })
    .url({ message: "MESSAGE: The field 'urlTrailer' must be a valid URL. CODE: URL_TRAILER_IS_INVALID" }),

  approvalRating: z
    .string({ error: "MESSAGE: The field 'approvalRating' is obligatory. CODE: APPROVAL_RATING_IS_OBLIGATORY" })
    .min(1, { message: "MESSAGE: The field 'approvalRating' cannot be empty. CODE: APPROVAL_RATING_IS_EMPTY" }),

  genres: z.array(
    z
      .string({ error: "MESSAGE: The field 'genres' must be an array of strings. CODE: GENRES_IS_INVALID" })
      .min(1, { message: "MESSAGE: The genre name cannot be empty. CODE: GENRE_NAME_IS_EMPTY" }),
    {
      error: "MESSAGE: The field 'genres' is obligatory. CODE: GENRES_IS_OBLIGATORY",
    }
  ),
  ageRating: z.enum(["L", "12", "14", "18"], {
    message: "MESSAGE: The field 'ageRating' must be one of the following: L, 12, 14, 18. CODE: AGE_RATING_INVALID",
  }),
  director: z
    .string({ error: "MESSAGE: The field 'director' is obligatory. CODE: DIRECTOR_IS_OBLIGATORY" })
    .min(1, { message: "MESSAGE: The field 'director' cannot be empty. CODE: DIRECTOR_IS_EMPTY" }),
});

export const movieFilterSchema = z
  .object({
    search: z
      .string({
        error: "MESSAGE: The field 'search' is obligatory. CODE: SEARCH_IS_OBLIGATORY",
      })
      .optional()
      .default(""),
    duration: z
      .string({
        error: "MESSAGE: The field 'duration' is obligatory. CODE: DURATION_IS_OBLIGATORY",
      })
      .min(1, {
        message: "MESSAGE: The field 'duration' cannot be empty. CODE: DURATION_IS_EMPTY",
      })
      .regex(/^\d+$/, {
        message: "MESSAGE: The field 'duration' must be a number in minutes. CODE: DURATION_MUST_BE_NUMBER",
      })
      .optional()
      .default("0"),
    ageRating: z
      .enum(["L", "12", "14", "18"], {
        message: "MESSAGE: The field 'ageRating' must be one of the following: L, 12, 14, 18. CODE: AGE_RATING_INVALID",
      })
      .optional()
      .default("L"),
    startRelease: z.coerce
      .date({ error: "MESSAGE: The field 'startRelease' must be a valid date. CODE: START_RELEASE_IS_INVALID" })
      .optional()
      .default(new Date()),
    endRelease: z.coerce
      .date({ error: "MESSAGE: The field 'endRelease' must be a valid date. CODE: END_RELEASE_IS_INVALID" })
      .optional()
      .default(new Date()),
    type: z
      .enum(["SEARCH", "ALL", "RELEASE", "DURATION", "AGE_RATING"], {
        message:
          "MESSAGE: The field 'type' must be either 'SEARCH', 'RELEASE',  'DURATION', 'AGE_RATING' or 'ALL'. CODE: TYPE_IS_INVALID",
      })
      .default("ALL"),
    page: z
      .number({
        error: "MESSAGE: The field 'page' must be a number. CODE: PAGE_MUST_BE_NUMBER",
      })
      .int({
        message: "MESSAGE: The field 'page' must be an integer. CODE: PAGE_MUST_BE_INTEGER",
      })
      .min(1, {
        message: "MESSAGE: The field 'page' must be greater than 0. CODE: PAGE_MIN_1",
      })
      .default(1),
  })
  .refine(
    (data) => {
      if (data.type === "RELEASE") {
        const sameDay =
          data.startRelease.getDate() === data.endRelease.getDate() &&
          data.startRelease.getMonth() === data.endRelease.getMonth() &&
          data.startRelease.getFullYear() === data.endRelease.getFullYear();
        if (sameDay) return false;
        if (data.startRelease > data.endRelease) return false;
      }
      return true;
    },
    {
      message:
        "MESSAGE: The 'startRelease' and 'endRelease' fields are mandatory when the type is 'RELEASE'. CODE: INVALID_RELEASE_DATE_FILTER",
    }
  );
