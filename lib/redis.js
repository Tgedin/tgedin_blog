import Redis from "ioredis";

// Configure Redis client with fallbacks for different environments
const getRedisConfiguration = () => {
  // For production: use REDIS_URL from environment variable
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }

  // For development: use local Redis or mock
  return {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || "",
    // If no Redis server available, use keyPrefix to create unique namespace
    keyPrefix: "tgedin_blog:",
  };
};

// Create Redis client - only initialize if needed
let redisClient;

if (process.env.NODE_ENV !== "test") {
  try {
    redisClient = new Redis(getRedisConfiguration());

    // Successful connection
    redisClient.on("connect", () => {
      console.log("🚀 Connected to Redis successfully");
    });

    // Handle errors gracefully
    redisClient.on("error", (error) => {
      console.warn("⚠️ Redis connection error:", error.message);
      // Continue app execution even if Redis fails
    });
  } catch (error) {
    console.warn("⚠️ Redis initialization failed:", error.message);
    // Set redisClient to null to fall back to non-cached behavior
    redisClient = null;
  }
}

// Cache wrapper function with TTL (time to live in seconds)
export async function getFromCache(key, fetchFn, ttl = 3600) {
  // If Redis is not available, execute the function directly
  if (!redisClient) {
    return fetchFn();
  }

  try {
    // Try to get from cache first
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // If not in cache, execute the function
    const result = await fetchFn();

    // Store in cache with TTL
    await redisClient.set(key, JSON.stringify(result), "EX", ttl);

    return result;
  } catch (error) {
    console.warn(`⚠️ Redis cache error for key ${key}:`, error.message);
    // Fallback to direct function execution
    return fetchFn();
  }
}

// Function to invalidate cache entries
export async function invalidateCache(key) {
  if (!redisClient) return;

  try {
    await redisClient.del(key);
  } catch (error) {
    console.warn(`⚠️ Redis invalidation error for key ${key}:`, error.message);
  }
}

// Delete multiple keys matching a pattern
export async function invalidateCachePattern(pattern) {
  if (!redisClient) return;

  try {
    // Get keys matching pattern
    const keys = await redisClient.keys(pattern);

    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(
        `🗑️ Invalidated ${keys.length} cache keys matching: ${pattern}`
      );
    }
  } catch (error) {
    console.warn(`⚠️ Redis pattern invalidation error:`, error.message);
  }
}

export default redisClient;
