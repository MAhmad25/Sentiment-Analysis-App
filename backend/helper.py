import string
import re


def toLowerCase(text: str) -> str:
    return text.lower()


def remove_urls(text: str) -> str:
    pattern = r'https?://\S+|www\.\S+'
    return re.sub(pattern, '', text)


def remove_digits(text: str) -> str:
    return re.sub(r'\d+', '', text)


def remove_emojis(text: str) -> str:
    emoji_pattern = re.compile(
        "["
        "\U0001F600-\U0001F64F"
        "\U0001F300-\U0001F5FF"
        "\U0001F680-\U0001F6FF"
        "\U0001F1E0-\U0001F1FF"
        "\U00002700-\U000027BF"
        "\U0001F900-\U0001F9FF"
        "\U00002600-\U000026FF"
        "]+",
        flags=re.UNICODE
    )
    return emoji_pattern.sub('', text)


def remove_punctuation(text: str) -> str:
    return text.translate(str.maketrans('', '', string.punctuation))


def preprocessing(text: str) -> str:
    text = remove_urls(text)
    text = remove_digits(text)
    text = remove_emojis(text)
    text = remove_punctuation(text)
    return text
