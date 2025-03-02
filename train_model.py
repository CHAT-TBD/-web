import json
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense

# โหลดชุดข้อมูล
with open("chatbot_data.json", "r", encoding="utf-8") as f:
    dataset = json.load(f)

inputs = [data["input"] for data in dataset]
responses = [data["response"] for data in dataset]

# Tokenizer
tokenizer = Tokenizer(num_words=5000, oov_token="<OOV>")
tokenizer.fit_on_texts(inputs + responses)

# แปลงข้อความเป็นตัวเลข
input_sequences = tokenizer.texts_to_sequences(inputs)
response_sequences = tokenizer.texts_to_sequences(responses)

max_length = 20
input_sequences = pad_sequences(input_sequences, maxlen=max_length, padding="post")
response_sequences = pad_sequences(response_sequences, maxlen=max_length, padding="post")

# สร้างโมเดล
model = Sequential([
    Embedding(input_dim=5000, output_dim=128, input_length=max_length),
    LSTM(128, return_sequences=True),
    LSTM(128),
    Dense(128, activation="relu"),
    Dense(len(tokenizer.word_index) + 1, activation="softmax")
])

model.compile(loss="sparse_categorical_crossentropy", optimizer="adam", metrics=["accuracy"])

# ฝึกโมเดลใหม่
model.fit(input_sequences, response_sequences, epochs=50, batch_size=32)

# บันทึกโมเดล
model.save("chatbot_model.h5")
