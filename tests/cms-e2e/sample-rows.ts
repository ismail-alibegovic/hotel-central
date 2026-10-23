import { toCmsLayout } from "../../src/cms/seedLayout";
import { sampleBlocks } from "../../src/cms/sampleBlocks";

/** English DEMO / SAMPLE sections in the CMS shape, for specs that preview them. Nothing here is real hotel content. */
export const sampleLayoutRows = () => toCmsLayout(sampleBlocks("en"), "en");
