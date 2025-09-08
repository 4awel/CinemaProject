import express, {
  type Application,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import mongoose, { model, Schema } from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path, { join, extname } from "path";
import multer from "multer";
import fs from "fs";

dotenv.config();

interface EnvironmentVariables {
  PORT?: string;
  MONGODB_URL: string;
  [key: string]: string | undefined;
}

const env = process.env as EnvironmentVariables;

const app: Application = express();
const PORT: string = env.PORT || "3005";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/CinemaDB";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const uploadsDir = join("..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Правильная настройка multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "image-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed (JPEG, JPG, PNG, GIF, WEBP)"));
    }
  },
});

interface IImage extends mongoose.Document {
  filename: string;
  originalname: string;
  path: string;
  size: number;
  mimetype: string;
  uploadedAt: Date;
}

interface IBanner extends mongoose.Document {
  title: string;
  description: string;
  image: mongoose.Types.ObjectId | IImage;
  createdAt: Date;
  isActive: boolean;
}

const UserSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  emailAdress: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  status: { type: String, require: true },
});

const User = mongoose.model("WorkUsers", UserSchema);

const TicketSchema = new mongoose.Schema({
  name: { type: String, require: true },
  phone: { type: Number, require: true },
  email: { type: String, require: true },
});

const Ticket = mongoose.model("Tickets", TicketSchema);

const ImagesSchema = new mongoose.Schema({
  filename: { type: String, require: true },
  originalname: { type: String, require: true },
  path: { type: String, require: true },
  size: { type: Number, require: true },
  mimetype: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const Image = mongoose.model<IImage>("Images", ImagesSchema);

const BannersSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Image,
    require: true,
  },
  createAt: { type: Date, default: Date.now },
});

const Banner = mongoose.model<IBanner>("Banner", BannersSchema);

app.use(express.json());

app.use("/uploads", express.static(uploadsDir));

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post("/delete/user", async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    if (!email) res.send("Undefind field email");
    await User.deleteOne({ emailAdress: email });
    res.send("OK").status(400);
  } catch (err) {
    res.send(err).status(200);
  }
});

app.post("/create/user", async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    if (username && email && password && role) {
      const user = new User({
        username: username,
        emailAdress: email,
        password: hashedPassword,
        status: role,
      });
      await user.save();
      console.log(user);
      res.send("User has been add!").status(201);
    } else res.send("Undefind field create user").status(401);
  } catch (err) {
    res.send(err).status(400);
  }
});

app.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send("Email adres or password is null");
    }

    const user = await User.findOne({ emailAdress: email });
    const hashedPassword = user?.password;
    if (hashedPassword) {
      const isComaprePassword = await bcrypt.compare(password, hashedPassword);
      if (isComaprePassword) {
        const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET!, {
          expiresIn: "3d",
        });
        res.json({ token });
      } else res.send("Invalid password").status(400);
    } else {
      res.send("Password is not found in data base");
    }
  } catch (err) {
    res.send(err).status(500);
  }
});

interface AuthenticatedRequest extends Request {
  user?: jwt.JwtPayload | string;
}

function aunthticetToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token && process.env.JWT_SECRET) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = user;
        console.log(user);
      }
      next();
    });
  } else res.sendStatus(401);
}

app.get(
  "/user/data",
  aunthticetToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user && typeof req.user === "string") res.status(400);
      const userId = (req as any).user.id;
      const user = await User.findById(userId);
      console.log(user);
      if (!userId)
        res.status(400).json({ error: "User ID not found in token" });
      if (user) {
        res.json({
          id: user._id,
          username: user.username,
          email: user.emailAdress,
          role: user.status,
        });
      } else res.status(404).json({ error: "User not found" });
    } catch (err) {
      res.send(err).status(500).json({ err: "Server error" });
    }
  }
);

app.post("/create/ticket", async (req: Request, res: Response) => {
  const { name, phone, email } = req.body;
  try {
    if (name && phone && email) {
      const ticket = new Ticket({
        name,
        phone,
        email,
      });
      await ticket.save();
      res.send(ticket).status(200);
    } else res.send("Undefind fields tickets").status(402);
  } catch (err) {
    res.send(err).status(500).json({ err: "Error create ticket" });
  }
});

app.get("/fetch/tickets", async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.find();
    res.send(tickets).status(200);
  } catch (err) {
    res.send(err).status(500).json({ err: "Error fetch tickets" });
  }
});

app.post("/delete/ticket", async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    if (!id) res.send("Undefind field id ticket");
    await Ticket.deleteOne({ _id: id });
    res.send("OK").status(400);
  } catch (err) {
    res.send(err).status(200);
  }
});

app.post(
  "/create/banner",
  aunthticetToken,
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;

      if (!title || !description) {
        res.status(400).json({ error: "Title and description are required" });
      }

      if (!req.file) {
        res.status(400).json({ error: "Image is required" });
      }

      // Сохраняем изображение
      const requireParams = req as any;
      const image = new Image({
        filename: requireParams.file.filename,
        originalname: requireParams.file.originalname,
        path: requireParams.file.path,
        size: requireParams.file.size,
        mimetype: requireParams.file.mimetype,
        uploadedAt: requireParams.file.uploadedAt,
      });

      await image.save();

      // Создаем баннер
      const banner = new Banner({
        title,
        description,
        image: image._id,
      });

      await banner.save();

      // Получаем баннер с populate и явной типизацией
      const populatedBanner = await Banner.findById(banner._id)
        .populate<{ image: IImage }>("image")
        .exec();

      if (!populatedBanner) {
        res.status(500).json({ error: "Failed to create banner" });
      }

      // Приводим тип к IImage
      const populatedImage = populatedBanner!.image as IImage;

      res.status(201).json({
        message: "Banner created successfully",
        banner: {
          id: populatedBanner!._id,
          title: populatedBanner!.title,
          description: populatedBanner!.description,
          image: {
            url: `http://localhost:${PORT}/uploads/${populatedImage.filename}`,
            originalName: populatedImage.originalname,
          },
          createdAt: populatedBanner!.createdAt,
        },
      });
    } catch (error) {
      console.error("Banner creation error:", error);
      res.status(500).json({ error: "Failed to create banner" });
    }
  }
);

app.get("/get/banner", async (req: Request, res: Response) => {
  try {
    const banners = await Banner.find()
      .populate<{ image: IImage }>("image")
      .sort({ createdAt: -1 });
    const bannersWithUrls = banners.map((banner) => {
      const image = banner.image as IImage;

      return {
        id: banner._id,
        title: banner.title,
        description: banner.description,
        image: image
          ? {
              url: `http://localhost:${PORT}/uploads/${image.filename}`,
              originalName: image.originalname,
            }
          : null,
        createdAt: banner.createdAt,
      };
    });

    res.send(bannersWithUrls).json(bannersWithUrls);
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({ error: "Failed to fetch banners" });
  }
});

app.post("/delete/banner", async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    console.log("IS->", id);

    const banner = await Banner.findOne({ _id: id }).populate("image");
    if (!banner) res.json("Banner not found");
    await Banner.deleteOne({ _id: id });
    if (banner!.image) {
      await Image.deleteOne({ _id: banner!.image._id });

      const fs = require("fs");
      const path = require("path");
      const filePath = path.join(
        "..",
        "uploads",
        (banner as any).image.filename
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    res.json("Banner was succes deleted").status(200);
  } catch (err) {
    res.send(err).status(500).json("Error on delete banner");
  }
});
