import asyncio
import edge_tts

async def main():
    try:
        communicate = edge_tts.Communicate("Prueba de audio en español latinoamericano.", "es-MX-JorgeNeural")
        await communicate.save("test_latino.mp3")
        print("SUCCESS")
    except Exception as e:
        print("ERROR:", e)

if __name__ == "__main__":
    asyncio.run(main())
