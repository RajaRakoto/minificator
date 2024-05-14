/* utils */
import { sharpTest, svgGoTestAsync } from "@/utils/images";

// ==============================

// test JPEG, PNG, WEBP sharp compression
const qualityValue = 70;

sharpTest("test.jpg", qualityValue, "jpeg");
sharpTest("test.png", qualityValue, "png");
sharpTest("test.webp", qualityValue, "webp");

// test SVGgo compression
svgGoTestAsync();
