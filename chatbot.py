from flask import Flask, request, jsonify
import json
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

app = Flask(__name__)

# โหลดชุดข้อมูล
with open("chatbot_data.json", "r", encoding="utf-8") as f:
    dataset = json.load(f)

# Tokenizer สำหรับแปลงข้อความเป็นตัวเลข
tokenizer = Tokenizer(num_words=5000, oov_token="<OOV>")
tokenizer.fit_on_texts([data["input"] for data in dataset] + [data["response"] for data in dataset])

# โหลดโมเดล
model = tf.keras.models.load_model("chatbot_model.h5")

max_length = 20  # ปรับให้เท่ากับตอนฝึกโมเดล

def get_response(text):
    seq = tokenizer.texts_to_sequences([text])
    seq = pad_sequences(seq, maxlen=max_length, padding="post")
    prediction = model.predict(seq)
    predicted_index = np.argmax(prediction)
    return tokenizer.index_word.get(predicted_index, "ขอโทษ ฉันไม่เข้าใจ")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")
    response = get_response(user_message)
    return jsonify({"response": response})

@app.route("/train", methods=["POST"])
def train():
    data = request.json
    new_input = data.get("input")
    new_response = data.get("response")

    # บันทึกข้อมูลใหม่ลง JSON
    dataset.append({"input": new_input, "response": new_response})
    with open("chatbot_data.json", "w", encoding="utf-8") as f:
        json.dump(dataset, f, ensure_ascii=False, indent=4)

    # ฝึกโมเดลใหม่
    import subprocess
    subprocess.run(["python", "train_model.py"])

    return jsonify({"message": "ฉันเรียนรู้คำตอบนี้แล้ว!"})

if __name__ == "__main__":
    app.run(debug=True)
