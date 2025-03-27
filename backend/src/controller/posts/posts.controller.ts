import { make } from "simple-body-validator";
import { msgTemplate } from "@/config/msgTemplate";
import { prisma } from "@/config/prismaClient";
import { Request, Response } from "express";
import { postValidation } from "./posts.validation";

const postUseCase = {
  createPost: async (req: Request, res: Response) => {
    const data = req.body;
    const validator = make(data, postValidation);

    if (!validator.validate()) {
      res
        .status(422)
        .json(msgTemplate("Semua input harus diisi", validator.errors().all()));
      return;
    }

    const post = await prisma.post.create({
      data: data,
    });

    res.json(msgTemplate("Data berhasil ditambahkan", post));
  },

  readPosts: async (req: Request, res: Response) => {
    const post = await prisma.post.findMany();
    res.json(msgTemplate("Data berhasil diambil", post));
  },

  readPostById: async (req: Request, res: Response) => {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!post) {
      res.status(404).json(msgTemplate("Data tidak ditemukan"));
      return;
    }

    res.json(msgTemplate("Data berhasil diambil", post));
  },

  updatePost: async (req: Request, res: Response) => {
    const post = await prisma.post.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });

    const data = req.body;
    const validator = make(data, postValidation);

    if (!validator.validate()) {
      res
        .status(422)
        .json(msgTemplate("Semua input harus diisi", validator.errors().all()));
      return;
    }

    res.json(msgTemplate("Data berhasil diupdate", post));
  },

  deletePost: async (req: Request, res: Response) => {
    const postExists = await prisma.post.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!postExists) {
      res.status(404).json(msgTemplate("Data tidak ditemukan"));
      return;
    }

    const post = await prisma.post.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!post) {
      res.status(404).json(msgTemplate("Data tidak ditemukan"));
      return;
    }

    res.json(msgTemplate("Data berhasil dihapus", post));
  },
};

export default postUseCase;
