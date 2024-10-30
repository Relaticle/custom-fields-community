# Installation

Thank you for purchasing **Custom Fields**! This guide provides step-by-step instructions on installing and configuring
the plugin.

## Requirements

- **PHP**: 8.1 or higher
- **Laravel**: 10.0 or higher
- **Filament**: 3.0 or higher

## Activating your license on Lemon Squeezy

Custom Fields uses [Lemon Squeezy](https://www.lemonsqueezy.com/) to handle payment and licensing.
For distribution we use [Satis Relaticle](https://satis.relaticle.com/), a private Composer repository.

During the purchasing process, Lemon Squeezy will provide you with a license key.

> Tip: You will need your `license key` to authenticate when you install the package with composer.

## Installing with Composer

To install Custom Fields you'll need to add the package to your `composer.json` file:

```json
{
    "repositories": [
        {
            "type": "composer",
            "url": "https://satis.relaticle.com"
        }
    ]
}
```

Once the repository has been added to your composer.json file, you can install Custom Fields like any other composer
package using the composer require command:

```bash
composer require relaticle/custom-fields
```

Next, you will be prompted to provide your username and password.

```bash
Loading composer repositories with package information
Authentication required (satis.relaticle.com):
Username: [licensee-email]
Password: [license-key]
```

Your username will be your email address and the password will is your license key.
For example, let's say we have the following email and license activation:

- Contact email: **myname@example.com**
- License key: **9f3a2e1d-5b7c-4f86-a9d0-3e1c2b4a5f8e**

You will need to enter the above information as follows when prompted for your credentials:

```bash
Loading composer repositories with package information
Authentication required (satis.relaticle.com):
Username: myname@example.com
Password: 9f3a2e1d-5b7c-4f86-a9d0-3e1c2b4a5f8e
```
