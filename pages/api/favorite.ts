import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    if (req.body.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { movieId }: { movieId: string } = req.body;
      const existingMovie = await prismadb.movie.findUnique({
        where: { id: movieId },
      });

      if (!existingMovie) throw new Error("Invalid id");

      const user = await prismadb.user.update({
        where: { id: currentUser.id },
        data: { favoriteIds: { push: movieId } },
      });

      return res.status(200).json(user);
    }
    if (req.body.method === "DELETE") {
      const { currentUser } = await serverAuth(req, res);
      const { movieId }: { movieId: string } = req.body;
      const existingMovie = await prismadb.movie.findUnique({
        where: { id: movieId },
      });

      if (!existingMovie) throw new Error("Invalid id");

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      const user = await prismadb.user.update({
        where: { id: currentUser.id },
        data: { favoriteIds: updatedFavoriteIds },
      });

      return res.status(200).json(user);
    }
    return res.status(405).end();
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
}
