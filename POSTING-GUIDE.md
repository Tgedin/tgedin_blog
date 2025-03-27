# Guide to Adding New Blog Posts

This guide explains how to add new articles to your "From Bricks to Bytes" blog, with a focus on minimalist Medium-like presentation.

## Content Structure

All blog content is organized in the following structure:

```
content/
├── YYYY/                   # Year folders (e.g., 2024)
│   ├── post-slug/          # Each post gets its own folder
│   │   ├── index.mdx       # The main post content
│   │   └── images/         # Images used in the post
│   │       ├── image1.jpg
│   │       └── image2.png
│   └── another-post/
│       ├── index.mdx
│       └── images/
└── YYYY+1/                 # Next year's posts
```

## Creating a New Post

### Step 1: Create the Post Directory

1. Identify which year the post belongs to (e.g., `content/2024/`)
2. Create a new folder with a slug name:
   - Use lowercase letters
   - Replace spaces with hyphens
   - Keep it short but descriptive
   - Example: `content/2024/machine-learning-basics/`

3. Inside this folder, create:
   - `index.mdx` file for your content
   - `images/` folder for any images you want to include

### Step 2: Write Your Post in MDX

The post should start with frontmatter (metadata) followed by your content:

```mdx
---
title: "Your Post Title"
date: "2024-02-15"
description: "A brief description of your post (150-160 characters recommended)"
tags: ["tag1", "tag2", "tag3"]
---

# Your Post Title

Introduction paragraph goes here. Keep it engaging and concise.

## First Section Heading

Your content goes here. Write in a clear, concise manner. Use short paragraphs and plenty of white space.

![Image description](/content/2024/your-post-slug/images/image1.jpg)

More content after the image...
```

### Step 3: Adding Images

1. Place all images in the `images/` folder within your post directory
2. Reference images in your MDX file using relative paths:
   ```mdx
   ![Alt text](/content/2024/your-post-slug/images/image-name.jpg)
   ```
3. Image recommendations:
   - Use JPG for photographs (better compression)
   - Use PNG for diagrams or screenshots with text
   - Optimize images before adding (aim for <200KB per image)
   - Ideal width is 800px to 1200px (will scale appropriately)

### Step 4: Formatting for Minimalist Style

For a clean, Medium-like style:

1. Use headings hierarchically (# for title, ## for sections, ### for subsections)
2. Keep paragraphs short (3-4 sentences max)
3. Use bullet points for lists
4. Add white space between sections
5. Use emphasis sparingly (`*italic*` or `**bold**`)
6. For code snippets:
   ```
   ```python
   def hello_world():
       print("Hello, world!")
   ```
   ```

## Example Post Structure

Here's a complete example of what a post folder might look like:

```
content/2024/data-visualization-basics/
├── index.mdx
└── images/
    ├── bar-chart-example.png
    ├── scatter-plot.jpg
    └── cover-image.jpg
```

And the corresponding `index.mdx` file:

```mdx
---
title: "Data Visualization Fundamentals"
date: "2024-03-15"
description: "Learn the basics of effective data visualization with practical examples"
tags: ["data-visualization", "matplotlib", "python", "tutorial"]
---

# Data Visualization Fundamentals

Good data visualization is critical for communicating insights effectively. This post covers the fundamentals of creating clear, impactful visualizations.

## Choosing the Right Chart Type

Different data patterns require different visualization approaches. Here are some guidelines:

- **Bar charts**: Best for comparing quantities across categories
- **Line charts**: Ideal for showing trends over time
- **Scatter plots**: Perfect for showing relationships between two variables

![Example of a well-designed bar chart](/content/2024/data-visualization-basics/images/bar-chart-example.png)

## Color Selection

Colors should enhance understanding, not distract from it:

1. Use a consistent color palette throughout
2. Ensure sufficient contrast for readability
3. Consider color-blindness accessibility
4. Limit to 5-7 colors maximum

## Code Example

```python
import matplotlib.pyplot as plt
import numpy as np

# Generate sample data
categories = ['A', 'B', 'C', 'D', 'E']
values = [23, 17, 35, 29, 12]

# Create bar chart
plt.figure(figsize=(10, 6))
plt.bar(categories, values, color='#3498db')
plt.title('Sample Bar Chart')
plt.xlabel('Categories')
plt.ylabel('Values')
plt.show()
```

## Summary

Remember that the goal of data visualization is to communicate insights clearly. Always prioritize clarity over decoration.
```

## Publishing Workflow

1. Create your post following the structure above
2. Run the development server (`npm run dev`) to preview your post
3. Access your post at `http://localhost:3000/blog/YYYY/your-post-slug`
4. Make any necessary adjustments to content or formatting
5. Commit your changes to the repository
6. The site will automatically rebuild and deploy with your new post

## Tips for Great Blog Posts

- **Be concise**: Aim for 1000-1500 words for most posts
- **Use visuals**: Include diagrams, charts, or screenshots
- **Break it up**: Use headings and short paragraphs
- **Be consistent**: Maintain a similar style across posts
- **Optimize images**: Large images slow down your site
- **Add code examples**: Include runnable code where relevant
- **Revise**: Edit your post for clarity before publishing
