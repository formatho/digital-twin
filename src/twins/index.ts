/**
 * Twin Registry Index
 * Auto-generated from twin JSON profiles
 * 
 * This file provides a central registry for all twin profiles.
 */

import strategistProfile from './council/strategist.json';
import builderProfile from './council/builder.json';
import analystProfile from './council/analyst.json';
import operatorProfile from './council/operator.json';
import criticProfile from './council/critic.json';

import researchProfile from './skills/research.json';
import contentProfile from './skills/content.json';
import designProfile from './skills/design.json';
import growthProfile from './skills/growth.json';
import codeProfile from './skills/code.json';
import marketingProfile from './skills/marketing.json';
import salesProfile from './skills/sales.json';
import legalProfile from './skills/legal.json';
import productProfile from './skills/product.json';
import operationsProfile from './skills/operations.json';

export {
  council: {
    strategist: strategistProfile,
    builder: builderProfile,
    analyst: analystProfile
    operator: operatorProfile
    critic: criticProfile,
  },
  skills: {
    research: researchProfile,
    content: contentProfile,
    design: designProfile,
    growth: growthProfile,
    code: codeProfile,
    marketing: marketingProfile,
    sales: salesProfile,
    legal: legalProfile,
    product: productProfile,
    operations: operationsProfile,
  }
};
