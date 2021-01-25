import asyncio
import websockets

async def echo(websocket, path):
    async for message in websocket:
        #print(message)
        await websocket.send(message)

start_server = websockets.serve(echo, "localhost", 8080)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

# async def playback(websocket, path):
#     async for message in websocket:

#         if message and message.playback:
#             await websocket.send()

#         print(message)
#         await websocket.send(message)


# def play_audio_stream():


# def play_audio_file():
