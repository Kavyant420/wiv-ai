const express = require('express');
const cors = require('cors');
const path = require('path');
const { G4F } = require("g4f");

const app = express();
const port = process.env.PORT || 3000;

// Initialize G4F
const g4f = new G4F();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public')); // Serve static files (put your HTML here)

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Chat completion endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { messages, options = {} } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ 
                error: 'Messages array is required',
                example: {
                    messages: [
                        { role: "system", content: "You are a helpful assistant." },
                        { role: "user", content: "Hello!" }
                    ]
                }
            });
        }

        console.log('🚀 G4F Chat Request:', {
            model: options.model || 'gpt-4',
            messageCount: messages.length,
            lastMessage: messages[messages.length - 1]?.content?.substring(0, 100) + '...'
        });

        // Default options
        const g4fOptions = {
            model: options.model || "gpt-4",
            debug: options.debug || false,
            retry: options.retry || {
                times: 3,
                condition: (text) => {
                    const words = text.split(" ");
                    return words.length > 5; // Ensure response has at least 5 words
                }
            },
            output: options.output || ((text) => text) // No modification by default
        };

        // Call G4F
        const startTime = Date.now();
        const response = await g4f.chatCompletion(messages, g4fOptions);
        const duration = Date.now() - startTime;

        console.log('✅ G4F Response received:', {
            duration: `${duration}ms`,
            responseLength: response?.length || 0,
            model: g4fOptions.model
        });

        res.json({
            success: true,
            text: response,
            meta: {
                model: g4fOptions.model,
                duration,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('❌ G4F Error:', error.message);
        
        res.status(500).json({
            success: false,
            error: 'Failed to generate response',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined,
            fallback: "I apologize, but I'm having trouble connecting to the AI service right now. Please try again in a moment."
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'G4F Chat Server',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Get available models endpoint
app.get('/api/models', (req, res) => {
    res.json({
        models: [
            { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
            { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
            { id: 'claude', name: 'Claude', provider: 'Anthropic' },
            { id: 'gemini', name: 'Gemini', provider: 'Google' }
        ],
        note: 'Model availability depends on G4F providers'
    });
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('💥 Server Error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Handle 404
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        available: [
            'POST /api/chat',
            'GET /api/health', 
            'GET /api/models',
            'GET /'
        ]
    });
});

// Start server
app.listen(port, () => {
    console.log(`
🚀 G4F Chat Server Running!
📍 Server: http://localhost:${port}
💬 Chat API: http://localhost:${port}/api/chat
📊 Health: http://localhost:${port}/api/health
🤖 Models: http://localhost:${port}/api/models

📁 Place your HTML file in ./public/index.html
🔧 Ready to serve G4F-powered chat requests!
    `);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down G4F Chat Server...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n👋 Shutting down G4F Chat Server...');
    process.exit(0);
});
