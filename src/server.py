from flask import Flask, request, jsonify, send_from_directory, make_response
from flask_cors import CORS
from sug import SentimentAnalyzer, is_exam_season, extract_stress_reason, get_ai_response
import os

app = Flask(__name__)
CORS(app, resources={r"/chat": {"origins": "*"}})

# Initialize sentiment analyzer
sentiment_analyzer = SentimentAnalyzer(age=20)

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get("message", "")

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Get AI-generated response
        ai_response = get_ai_response(user_message)

        # Analyze sentiment of the user message
        sentiment = sentiment_analyzer.analyze_sentiment(
            user_message,
            is_exam_season=is_exam_season(),
            stress_reason=extract_stress_reason(user_message)
        )

        return jsonify({
            "user_message": user_message,
            "ai_response": ai_response,
            "sentiment_score": sentiment["compound"]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/generate_report', methods=['GET'])
def generate_report():
    try:
        report = sentiment_analyzer.generate_report()
        sentiment_analyzer.save_to_csv('therapy_session.csv')
        
        # Save text report
        file_path = os.path.join(os.getcwd(), 'therapy_report.txt')
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(report)

        return jsonify({
            "report": report,
            "report_image_url": "/sentiment_report.png",
            "report_text_url": "/therapy_report.txt"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/sentiment_report.png')
def serve_report_image():
    file_path = os.path.join(os.getcwd(), 'sentiment_report.png')

    if os.path.exists(file_path):
        if request.args.get('download') == 'true':
            return send_from_directory(
                os.getcwd(),
                'sentiment_report.png',
                as_attachment=True,
                mimetype='image/png'
            )
        else:
            response = send_from_directory(os.getcwd(), 'sentiment_report.png')
            response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
            response.headers['Pragma'] = 'no-cache'
            response.headers['Expires'] = '0'
            return response
    else:
        return jsonify({"error": "Report image not found"}), 404

@app.route('/therapy_report.txt')
def serve_report_text():
    file_path = os.path.join(os.getcwd(), 'therapy_report.txt')

    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        response = make_response(content)
        response.headers["Content-Type"] = "text/plain; charset=utf-8"
        return response
    else:
        return jsonify({"error": "Therapy report file not found"}), 404

@app.route('/download_therapy_report.txt')
def download_report_text():
    file_path = os.path.join(os.getcwd(), 'therapy_report.txt')

    if os.path.exists(file_path):
        return send_from_directory(
            os.getcwd(),
            'therapy_report.txt',
            as_attachment=True,
            mimetype='text/plain; charset=utf-8'
        )
    else:
        return jsonify({"error": "Therapy report file not found"}), 404

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)