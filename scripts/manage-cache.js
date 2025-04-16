/**
 * Cache Management Utility
 *
 * This script helps manage the Redis cache for the blog.
 * Use it to clear all or specific cache entries during deployments or content updates.
 */

const { createInterface } = require("readline");
const { Redis } = require("ioredis");
const dotenv = require("dotenv");

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

// Configure Redis client
const getRedisConfiguration = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }

  return {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || "",
    keyPrefix: "tgedin_blog:",
  };
};

// Initialize Redis client
let redis;

try {
  redis = new Redis(getRedisConfiguration());
} catch (error) {
  console.error("Failed to connect to Redis:", error.message);
  process.exit(1);
}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Main menu
async function showMenu() {
  console.log("\n📦 Redis Cache Management\n");
  console.log("1) List all cache keys");
  console.log("2) Clear all cache");
  console.log("3) Clear post cache");
  console.log("4) Clear project cache");
  console.log("5) Clear sitemap/RSS cache");
  console.log("6) Clear specific key");
  console.log("q) Quit");

  rl.question("\nSelect an option: ", async (answer) => {
    switch (answer.toLowerCase()) {
      case "1":
        await listAllKeys();
        break;
      case "2":
        await clearAllCache();
        break;
      case "3":
        await clearPostCache();
        break;
      case "4":
        await clearProjectCache();
        break;
      case "5":
        await clearSitemapRssCache();
        break;
      case "6":
        rl.question(
          "Enter key pattern to clear (e.g., post:2023:*): ",
          async (pattern) => {
            await clearSpecificKeys(pattern);
          }
        );
        return;
      case "q":
        rl.close();
        redis.quit();
        return;
      default:
        console.log("Invalid option");
    }

    // Return to menu after operation completes
    setTimeout(showMenu, 1000);
  });
}

// List all cache keys
async function listAllKeys() {
  try {
    const keys = await redis.keys("*");
    console.log("\n🔑 All cache keys:");

    if (keys.length === 0) {
      console.log("No keys found in cache");
      return;
    }

    keys.forEach((key) => console.log(`- ${key}`));
    console.log(`\nTotal keys: ${keys.length}`);
  } catch (error) {
    console.error("Error listing keys:", error.message);
  }
}

// Clear all cache
async function clearAllCache() {
  try {
    await redis.flushall();
    console.log("✅ All cache cleared successfully");
  } catch (error) {
    console.error("Error clearing all cache:", error.message);
  }
}

// Clear post cache
async function clearPostCache() {
  try {
    const keys = await redis.keys("post:*");

    if (keys.length === 0) {
      console.log("No post cache keys found");
      return;
    }

    await redis.del(keys);
    console.log(`✅ Cleared ${keys.length} post cache entries`);
  } catch (error) {
    console.error("Error clearing post cache:", error.message);
  }
}

// Clear project cache
async function clearProjectCache() {
  try {
    const keys = await redis.keys("project:*");

    if (keys.length === 0) {
      console.log("No project cache keys found");
      return;
    }

    await redis.del(keys);
    console.log(`✅ Cleared ${keys.length} project cache entries`);
  } catch (error) {
    console.error("Error clearing project cache:", error.message);
  }
}

// Clear sitemap/RSS cache
async function clearSitemapRssCache() {
  try {
    const keys = await redis.keys("sitemap:*");
    keys.push(...(await redis.keys("rss:*")));

    if (keys.length === 0) {
      console.log("No sitemap/RSS cache keys found");
      return;
    }

    await redis.del(keys);
    console.log(`✅ Cleared ${keys.length} sitemap/RSS cache entries`);
  } catch (error) {
    console.error("Error clearing sitemap/RSS cache:", error.message);
  }
}

// Clear specific keys matching pattern
async function clearSpecificKeys(pattern) {
  try {
    const keys = await redis.keys(pattern);

    if (keys.length === 0) {
      console.log(`No keys found matching pattern: ${pattern}`);
      setTimeout(showMenu, 1000);
      return;
    }

    console.log(`Found ${keys.length} keys matching pattern: ${pattern}`);
    keys.forEach((key) => console.log(`- ${key}`));

    rl.question(
      `\nConfirm deletion of these ${keys.length} keys? (y/n): `,
      async (answer) => {
        if (answer.toLowerCase() === "y") {
          await redis.del(keys);
          console.log(`✅ Deleted ${keys.length} keys`);
        } else {
          console.log("Operation canceled");
        }

        setTimeout(showMenu, 1000);
      }
    );
  } catch (error) {
    console.error("Error clearing specific keys:", error.message);
    setTimeout(showMenu, 1000);
  }
}

// Start the menu
console.log("Connecting to Redis...");
redis.on("connect", () => {
  console.log("Connected to Redis successfully");
  showMenu();
});

redis.on("error", (error) => {
  console.error("Redis connection error:", error.message);
  rl.close();
  process.exit(1);
});
