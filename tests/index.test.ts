import { sharpTest } from "@/utils/images";

const qualityValue = 70;

sharpTest("test.jpg", qualityValue, "jpeg");
sharpTest("test.png", qualityValue, "png");
sharpTest("test.webp", qualityValue, "webp");
